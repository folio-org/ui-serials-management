import cloneDeep from 'lodash/cloneDeep';

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
