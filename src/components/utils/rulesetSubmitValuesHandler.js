const rulesetSubmitValuesHandler = (values) => {
  return {
    ...values,

    recurrence: {
      ...values?.recurrence,
      rules: values?.recurrence?.rules?.map((e) => {
        // If no ordinal specified, assume ordinal is 1 for all rules
        if (!e?.ordinal) {
          e.ordinal = 1;
        }
        // If no pattern fields are supplied (in the case of the day time unit)
        // Add anempty pattern object to all rules
        if (!e?.pattern) {
          e.pattern = {};
        }
        e.patternType = values?.patternType;
        return e;
      }),
    },
    templateConfig: {
      ...values?.templateConfig,
      rules: values?.templateConfig?.rules?.map((rule, ruleIndex) => {
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
