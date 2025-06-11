import { Token } from './Token.js';
import type { TokenType } from './types.js';

export class Lexer {
  static keywords = new Map<string, TokenType>([
    ['entityDef', 'ENTITY_DEF'],
    ['entitydef', 'ENTITY_DEF'], // TODO @playdungeonmans whether entitydef is case sensitive
    ['true', 'TRUE'],
    ['false', 'FALSE'],
  ]);

  private start = 0;
  private current = 0;
  private line = 1;

  #tokens: Token[] = [];

  get tokens() {
    return this.#tokens;
  }

  constructor(private readonly source: string) {}

  tokenize() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }
    this.addEOF();
  }

  private scanToken() {
    const char = this.advance();
    switch (char) {
      case '{':
        return this.addToken('LEFT_BRACE');
      case '}':
        return this.addToken('RIGHT_BRACE');
      case '"':
        return this.stringToken();
      case '-':
        return this.numberOrString();
      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace.
        return;
      case '\n':
        this.addToken('EOL');
        this.line++;
        return;
      // @ts-expect-error -- we want to fall through
      case '/':
        if (this.peek() === '/') {
          return this.lineCommentToken();
        }
      default:
        if (isDigit(char)) return this.numberOrString();
        if (isAlpha(char)) return this.identifier();
    }
  }

  private lineCommentToken() {
    while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
    return this.addToken('COMMENT');
  }

  private addEOF() {
    this.#tokens.push(new Token('EOF', this.current, 0, ''));
  }

  private identifier() {
    while (!isWhitespace(this.peek()) && !this.isAtEnd()) this.advance();

    const lexeme = this.source.substring(this.start, this.current);
    const keyword = Lexer.keywords.get(lexeme);
    if (keyword) this.addToken(keyword);
    else this.addToken('IDENTIFIER');
  }

  private numberOrString() {
    while (!isWhitespace(this.peek()) && !this.isAtEnd()) this.advance();
    const lexeme = this.source.substring(this.start, this.current);
    if (isNumeric(lexeme)) this.addToken('NUMBER');
    else this.addToken('STRING');
  }

  private stringToken() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') this.line++;
      this.advance();
    }
    if (this.isAtEnd()) {
      console.error(
        `Missing closing quotes matching ${this.line}:${this.start}`
      );
    }
    // The closing "
    this.advance();

    this.addToken('STRING');
  }

  private advance() {
    return this.source.charAt(this.current++);
  }

  private isAtEnd() {
    return this.current >= this.source.length;
  }

  private peek(): string {
    if (this.isAtEnd()) return '';
    return this.source.charAt(this.current);
  }

  private addToken(type: TokenType) {
    const lexeme = this.source.slice(this.start, this.current);
    this.#tokens.push(
      new Token(type, this.start, this.current - this.start, lexeme)
    );
  }
}

const whitespaces = new Set([' ', '\r', '\t', '\n']);
const isWhitespace = (char: string) => whitespaces.has(char);

const isAlpha = (char: string) => {
  return (
    (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char == '_'
  );
};

const isDigit = (char: string) => {
  return char >= '0' && char <= '9';
};

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isNumeric.js
const numberRegex = new RegExp(`^[+-]?([0-9]*[.])?[0-9]+$`);

const isNumeric = (n: string) => {
  return numberRegex.test(n);
};
