import { identity } from './helpers/identity.js';
import {
  EntityDefKeyValuePairValue,
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
export const jsToManyEntityDefs = (
  definitions: Record<string, Record<string, EntityDefKeyValuePairValue>>,
  options: Options = {}
) => {
  const opts = { ...defaultOptions, ...options };
  const entityDefs = Object.entries(definitions)
    .filter(([key, _]) => key !== '$schema')
    .filter(([key, _]) => !key.startsWith('//'))
    .map(([entityDefName, definition]) =>
      jsToEntitydef(entityDefName, definition, opts)
    );
  return entityDefs.join('\n');
};
