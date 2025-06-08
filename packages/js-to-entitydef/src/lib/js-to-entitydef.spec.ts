import { jsToEntitydef } from './js-to-entitydef.js';
import { stripRefs } from './refs/ref.transformer.js';

it('should work', () => {
  const result = jsToEntitydef('mymonster', {
    test: 1,
    hello: false,
    'asd fasdf': 'totally nice string',
  });

  expect(result).toEqual(`entityDef "mymonster"
{
    test 1
    hello false
    "asd fasdf" "totally nice string"
}
`);
});

it('should strip refs if syntax is correct', () => {
  const result = jsToEntitydef(
    'mymonster',
    {
      test: 1,
      hello: false,
      shouldGetStrippedAll: '@ref(totally nice string)',
      shouldGetStrippedEmpty: '@ref()thats an empty ref call',
      shouldGetStrippedMiddle: 'this calls @ref(the) ref in the middle',
      shouldGetStrippedMulti:
        '@ref(this) @ref(here) has multiple ref @ref(calls)',
      shouldStay1: 'totally nice string_@ref',
      shouldStay2: 'totally nice @ref_string',
      shouldStay3: '@reftotally nice _string',
      '@ref(shouldGetStrippedRefKey)': 'hello',
    },
    { keyTransform: stripRefs, valueTransform: stripRefs }
  );

  expect(result).toEqual(`entityDef "mymonster"
{
    test 1
    hello false
    shouldGetStrippedAll "totally nice string"
    shouldGetStrippedEmpty "thats an empty ref call"
    shouldGetStrippedMiddle "this calls the ref in the middle"
    shouldGetStrippedMulti "this here has multiple ref calls"
    shouldStay1 "totally nice string_@ref"
    shouldStay2 "totally nice @ref_string"
    shouldStay3 "@reftotally nice _string"
    shouldGetStrippedRefKey "hello"
}
`);
});

it('should strip "commented" keys', () => {
  const result = jsToEntitydef(
    'mymonster',
    {
      test: 1,
      '// commented': 'hello',
      '//commentedout': 'hi',
      notcommented: 'hiho',
    },
    { keyTransform: stripRefs, valueTransform: stripRefs }
  );

  expect(result).toEqual(`entityDef "mymonster"
{
    test 1
    notcommented "hiho"
}
`);
});

it('should error when the input json is not a plain object', () => {
  const resultFn = () =>
    jsToEntitydef(
      'mymonster',
      // @ts-expect-error -- exception testing
      'not an object',
      { keyTransform: stripRefs, valueTransform: stripRefs }
    );
  expect(resultFn).toThrow(
    'Validation failed. Provided entity must be a plain object.'
  );
});
