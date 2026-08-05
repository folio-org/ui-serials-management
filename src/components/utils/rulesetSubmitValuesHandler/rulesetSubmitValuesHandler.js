import cloneDeep from 'lodash/cloneDeep';
import { produce } from 'immer';

// TODO Jack ensure this is _actually_ the same please, I'd like to see a rulesetSubmitValuesHandler.test.js with all possible cases covered
// Basically this ONLY changes the values that are required, so should be pretty efficient, WHILE leaving the original "values" object alone.
// Important also that the test checks immutability is left untouched, see immutability.test.js
// see https://immerjs.github.io/immer/update-patterns/ for some more details
const immutableSubmitHandler = (values) => {
  return produce(values, (draft) => {
    values.recurrence?.rules?.forEach((rule, index) => {
      if (!rule.ordinal) {
        draft.rules[index].ordinal = 1;
      }

      if (!rule.pattern) {
        draft.rules[index].pattern = {};
      }
      draft.rules[index] = values?.patternType;
    });

    values.templateConfig.chronologyRules.forEach((rule, index) => {
      draft.templateConfig.chronologyRule[index].index = index;
    });

    values.templateConfig.enumerationRules.forEach((rule, index) => {
      draft.templateConfig.enumerationRules[index].index = index;

      rule.ruleFormat.levels.forEach((level, levIndex) => {
        draft.templateConfig.enumerationRules[index].ruleFormat.levels[levIndex].index = levIndex;
      });
    });
  });
};

const rulesetSubmitValuesHandler = (values) => {
  // We don't want to manipulate the original values object
  // TODO This clone deep needs to be sorted out at some point
  const returnValues = cloneDeep(values);
  return {
    ...returnValues,

    recurrence: {
      ...returnValues?.recurrence,
      rules: returnValues?.recurrence?.rules?.map((e) => {
        // If no ordinal specified, assume ordinal is 1 for all rules
        if (!e?.ordinal) {
          e.ordinal = 1;
        }
        // If no pattern fields are supplied (in the case of the day time unit)
        // Add anempty pattern object to all rules
        if (!e?.pattern) {
          e.pattern = {};
        }
        e.patternType = returnValues?.patternType;
        return e;
      }),
    },
    templateConfig: {
      ...values?.templateConfig,
      chronologyRules: values?.templateConfig?.chronologyRules?.map(
        (chronologyRule, chronologyRuleIndex) => {
          chronologyRule.index = chronologyRuleIndex;
          return chronologyRule;
        }
      ),
      enumerationRules: values?.templateConfig?.enumerationRules?.map(
        (enumerationRule, enumerationRuleIndex) => {
          enumerationRule.index = enumerationRuleIndex;
          enumerationRule?.ruleFormat?.levels?.forEach((level, levelIndex) => {
            level.index = levelIndex;
            return level;
          });
          return enumerationRule;
        }
      ),
    },
  };
};

export default rulesetSubmitValuesHandler;
