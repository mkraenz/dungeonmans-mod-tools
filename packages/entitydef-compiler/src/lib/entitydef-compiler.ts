import { JsonTransformer } from './entity-transformer/EntityTransformer.js';
import { Lexer } from './lexer/Lexer.js';

export const parseEntityDefs = (fileContents: string, filepath: string) => {
  const lexer = new Lexer(fileContents);
  lexer.tokenize();

  const transformer = new JsonTransformer(lexer.tokens, filepath);
  transformer.transform();

  return transformer.toMap();
};
