import deepDeleteKeys from './deepDeleteKeys';

/**
 * Transforms a ruleset into initial form values for a form, including handling specific nested structures.
 * @param {Object} ruleset - The ruleset data to be transformed.
 * @returns {Object} - The transformed ruleset as initial form values, with specific keys removed.
 */

const getRulesetFormValues = (ruleset) => {
  const initialValues = {
    ...ruleset,
    recurrence: ruleset?.recurrence,
    patternType: ruleset?.recurrence?.rules?.[0]?.patternType?.value,
    ...(ruleset?.omission && {
      omission: {
        rules: ruleset?.omission?.rules?.map((rule) => ({
          ...rule,
          patternType: rule?.patternType?.value,
        })),
      },
    }),
    ...(ruleset?.combination && {
      combination: {
        rules: ruleset?.combination?.rules?.map((rule) => ({
          ...rule,
          patternType: rule?.patternType?.value,
        })),
      },
    }),
    templateConfig: {
      templateString: ruleset?.templateConfig?.templateString,
      rules: ruleset?.templateConfig?.rules?.map((rule) => ({
        templateMetadataRuleType: rule?.templateMetadataRuleType?.value,
        ruleType: {
          ...rule?.ruleType,
          templateMetadataRuleFormat: rule?.ruleType?.templateMetadataRuleFormat?.value,
        },
      })),
    },
  };

  const keysToDelete = ['id', 'label', 'dateCreated', 'lastUpdated', 'owner'];

  return deepDeleteKeys(initialValues, keysToDelete);
};

export default getRulesetFormValues;
