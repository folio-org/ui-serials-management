import cloneDeep from 'lodash/cloneDeep';

const rulesetSubmitValuesHandler = (values) => {
  // We don't want to manipulate the original values object
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
      ...returnValues?.templateConfig,
      rules: returnValues?.templateConfig?.rules?.map((rule, ruleIndex) => {
        rule.index = ruleIndex;
        rule?.ruleType?.ruleFormat?.levels?.forEach((level, levelIndex) => {
          level.index = levelIndex;
          return level;
        });
        return rule;
      }),
    },
  };
};

export default rulesetSubmitValuesHandler;
