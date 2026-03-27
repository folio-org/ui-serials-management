import cloneDeep from 'lodash/cloneDeep';
import { produce } from 'immer';

// See https://blog.bitsrc.io/using-immer-with-react-a-simple-solutions-for-immutable-states-a6ebb8b0bfa for more information on why immer

const testMutableFunc = (values) => {
  values.testShallowKey = true;
  values.deepValue.testDeepKey = true;
  return values;
};

// This is kind of the same as immer, except producing a new mutable object just to leave the old one alone
const testLodashImmutableFunc = (values) => {
  const newValues = cloneDeep(values);

  newValues.testShallowKey = true;
  newValues.deepValue.testDeepKey = true;
  return newValues;
};

// This is clearly too verbose
const testSpreadImmutableFunc = (values) => {
  const newValues = {
    ...values,
    deepValue: {
      ...values.deepValue,
      testDeepKey: true,
    }
  };
  newValues.testShallowKey = true;
  return newValues;
};

// Keeps the shape the SAME as if we handle the object directly
const testImmerImmutableFunc = (values) => {
  return produce(values, draft => {
    draft.testShallowKey = true;
    draft.deepValue.testDeepKey = true;
  });
};

let testValues;
describe('testing immutability', () => {
  beforeEach(() => {
    testValues = {
      someKey: 'a',
      otherKey: 'b',
      deepValue: {
        deepKey: 'c',
      }
    };
  });

  describe.each([
    {
      func: testMutableFunc,
      funcName: 'testMutableFunc',
      expectedMutable: true
    },
    {
      func: testLodashImmutableFunc,
      funcName: 'testLodashImmutableFunc',
      expectedMutable: false
    },
    {
      func: testSpreadImmutableFunc,
      funcName: 'testSpreadImmutableFunc',
      expectedMutable: false
    },
    {
      func: testImmerImmutableFunc,
      funcName: 'testImmerImmutableFunc',
      expectedMutable: false
    }
  ])('run $funcName', ({
    func,
    funcName,
    expectedMutable
  }) => {
    let newValues;
    beforeEach(() => {
      newValues = func(testValues);
    });

    test('newValues is as expected', () => {
      expect(newValues).toEqual({
        someKey: 'a',
        otherKey: 'b',
        testShallowKey: true,
        deepValue: {
          deepKey: 'c',
          testDeepKey: true,
        }
      });
    });

    if (expectedMutable) {
      test(`testValues is mutated by ${funcName}`, () => {
        expect(testValues).toEqual({
          someKey: 'a',
          otherKey: 'b',
          testShallowKey: true,
          deepValue: {
            deepKey: 'c',
            testDeepKey: true,
          }
        });
      });
    } else {
      test(`testValues is not mutated by ${funcName}`, () => {
        expect(testValues).toEqual({
          someKey: 'a',
          otherKey: 'b',
          deepValue: {
            deepKey: 'c',
          }
        });
      });
    }
  });
});

