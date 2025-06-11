import { Token } from '../lexer/Token.js';
import { TokenType } from '../lexer/types.js';

type EntityName = string;

export type EntityLocation = {
  filepath: string;
  entity: Record<string, unknown>;
  name: EntityName;
};

export class JsonTransformer {
  constructor(
    private readonly tokens: Token[],
    private readonly filepath: string
  ) {}

  private registry: Map<EntityName, EntityLocation> = new Map();

  has(name: string) {
    return this.registry.has(name);
  }

  set(name: string, loc: EntityLocation) {
    this.registry.set(name, loc);
  }

  get(name: string) {
    return this.registry.get(name);
  }

  toString() {
    return JSON.stringify([...this.registry]);
  }

  toArray() {
    return this.registry
      .entries()
      .toArray()
      .map(([_, loc]) => loc);
  }

  toMap() {
    return new Map(this.registry.entries());
  }

  transform() {
    this.registry.clear();
    let currentEntity: EntityLocation | null = null;

    const relevantTokens = this.tokens.filter(
      (t) => !(['WHITESPACE', 'EOF', 'COMMENT'] as TokenType[]).includes(t.type)
    );

    for (let i = 0; i < relevantTokens.length; i++) {
      const token = relevantTokens[i];
      const prevToken = i > 0 ? relevantTokens[i - 1] : null;
      const prevPrevToken = i > 1 ? relevantTokens[i - 2] : null;

      if (token.type === 'ENTITY_DEF') {
        // start a new entity
        currentEntity = { filepath: this.filepath, entity: {}, name: '' };
      } else if (token.type === 'STRING' && prevToken?.type === 'ENTITY_DEF') {
        if (currentEntity) {
          currentEntity.name = removeSurroundingDoubleQuotes(token.lexeme);
        }
      } else if (token.type === 'LEFT_BRACE') {
        // Start of entity body
      } else if (token.type === 'RIGHT_BRACE') {
        // End of entity body and end of entity definition
        if (currentEntity) {
          this.registry.set(currentEntity.name, currentEntity);
          currentEntity = null;
        }
      } else if (
        (
          ['STRING', 'IDENTIFIER', 'NUMBER', 'TRUE', 'FALSE'] as TokenType[]
        ).includes(token.type) &&
        prevToken &&
        (
          ['STRING', 'IDENTIFIER', 'NUMBER', 'TRUE', 'FALSE'] as TokenType[]
        ).includes(prevToken?.type as TokenType) &&
        prevPrevToken?.type === 'EOL'
      ) {
        // Handle key-value pairs
        if (currentEntity) {
          currentEntity.entity[
            removeSurroundingDoubleQuotes(prevToken.lexeme)
          ] = this.transformLexemeValue(token);
        }
      }
    }
  }

  private transformLexemeValue(token: Token) {
    switch (token.type) {
      case 'STRING':
        return removeSurroundingDoubleQuotes(token.lexeme);
      case 'NUMBER':
        return parseFloat(token.lexeme);
      case 'TRUE':
        return true;
      case 'FALSE':
        return false;
      default:
        return token.lexeme; // For identifiers or other types
    }
  }
}

/** Removes leading and trailing double quotes, but leave quotes inside the string intact */
const removeSurroundingDoubleQuotes = (str: string) =>
  str.replace(/^"(.*)"$/, '$1');
