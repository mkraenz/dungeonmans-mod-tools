import { identity } from './helpers/identity.js';

export type EntityDefKeyValuePairValue = number | boolean | string;

type Options = {
  keyTransform?: (key: string) => string;
  valueTransform?: (val: unknown) => unknown;
};
const defaultOptions = {
  keyTransform: identity,
  valueTransform: identity,
};

class JsToEntityDefTransformer {
  private readonly keyTransform: (key: string) => string;
  private readonly valueTransform: (key: unknown) => unknown;

  constructor(
    private readonly entityName: string,
    private readonly keyValuePairs: Record<string, EntityDefKeyValuePairValue>,
    options: Options = {}
  ) {
    this.keyTransform = options.keyTransform ?? defaultOptions.keyTransform;
    this.valueTransform =
      options.valueTransform ?? defaultOptions.valueTransform;
  }

  toEntityDef() {
    const header = `entityDef "${this.entityName}"`;
    const rows = Object.entries(this.keyValuePairs)
      .filter(([key, _]) => !this.shouldStripKey(key))
      .map(
        ([key, value]) =>
          `    ${this.toPrintedKey(key)} ${this.toPrintedValue(value)}`
      );

    const lines = [header, '{', ...rows, '}'];
    return lines.join('\n').concat('\n'); // add a final empty line
  }

  private shouldStripKey(key: string) {
    return key.startsWith('//');
  }

  private toPrintedKey(key: string) {
    const strippedKey = this.keyTransform(key);
    if (key.includes(' ')) return `"${strippedKey}"`;
    return strippedKey;
  }

  private toPrintedValue(val: EntityDefKeyValuePairValue) {
    return typeof val === 'string'
      ? `"${this.valueTransform(val)}"`
      : this.valueTransform(val);
  }
}

export function jsToEntitydef(
  name: string,
  keyValuePairs: Record<string, EntityDefKeyValuePairValue>,
  options: Options = {}
): string {
  return new JsToEntityDefTransformer(
    name,
    keyValuePairs,
    options
  ).toEntityDef();
}
