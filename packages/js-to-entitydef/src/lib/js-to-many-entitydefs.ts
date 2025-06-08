import { identity } from './helpers/identity.js';
import {
  EntityDefKeyValuePairValue as Value,
  jsToEntitydef,
} from './js-to-entitydef.js';

type Options = {
  keyTransform?: (key: string) => string;
  valueTransform?: (val: unknown) => unknown;
};
const defaultOptions = {
  keyTransform: identity,
  valueTransform: identity,
};

/**
 * Turns a record into the contents of an entity def file, i.e. zero to many entity defs.
 * Automatically strips out keys that start with `$schema` or `//`, and ignores them.
 *
 * $schema is used to provide JSON schema metadata. `//` is our custom comment syntax.
 */
export const jsToManyEntityDefs = (
  definitions: Record<string, Record<string, Value>>,
  options: Options = {}
) => {
  const schemaKey = '$schema';
  const commentedKeyPrefix = '//';

  const opts = { ...defaultOptions, ...options };
  const entityDefs = Object.entries(definitions)
    .filter(([key, _]) => key !== schemaKey)
    .filter(([key, _]) => !key.startsWith(commentedKeyPrefix))
    .map(([entityDefName, definition]) =>
      jsToEntitydef(entityDefName, definition, opts)
    );
  return entityDefs.join('\n');
};
