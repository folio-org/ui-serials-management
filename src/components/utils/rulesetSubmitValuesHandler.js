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
