import deepDeleteKeys from './deepDeleteKeys';

/**
 * Transforms a ruleset into initial form values for a form, including handling specific nested structures.
 * @param {Object} ruleset - The ruleset data to be transformed.
 * @returns {Object} - The transformed ruleset as initial form values, with specific keys removed.
 */
const getRulesetFormValues = (ruleset) => {
  // TODO This uitl needs to be refactored as it no longer serves its original purpose
  // We orinally mapped all refdataValues using .value but with the textual enumeration levels now uising id
  // This means that deep deleting the keys will not work as expected
  const keysToDelete = ['id', 'label', 'dateCreated', 'lastUpdated', 'owner'];

  // As we map refdataCategory and refdataValue by ID, we dont want these values deep deleted
  const enumerationRules = ruleset?.templateConfig?.enumerationRules?.map(
    (rule) => {
      if (rule?.templateMetadataRuleFormat?.value === 'enumeration_textual') {
        return {
          index: rule?.index,
          templateMetadataRuleFormat: rule?.templateMetadataRuleFormat?.value,
          ruleFormat: {
            refdataCategory: { id: rule?.ruleFormat?.refdataCategory?.id },
            levels: rule?.ruleFormat?.levels?.map((level) => ({
              index: level?.index,
              units: level?.units,
              refdataValue: { id: level?.refdataValue?.id },
              internalNote: level?.internalNote,
            })),
          },
        };
      } else {
        return {
          ...deepDeleteKeys(rule, keysToDelete),
          templateMetadataRuleFormat: rule?.templateMetadataRuleFormat?.value,
        };
      }
    }
  );

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
      chronologyRules: ruleset?.templateConfig?.chronologyRules?.map(
        (rule) => ({
          ...rule,
          templateMetadataRuleFormat: rule?.templateMetadataRuleFormat?.value,
        })
      ),
      enumerationRules: ruleset?.templateConfig?.enumerationRules?.map(
        (rule) => ({
          ...rule,
          templateMetadataRuleFormat: rule?.templateMetadataRuleFormat?.value,
        })
      ),
    },
  };

  const formattedValues = deepDeleteKeys(initialValues, keysToDelete);
  return {
    ...formattedValues,
    templateConfig: { ...formattedValues.templateConfig, enumerationRules },
  };
};

export default getRulesetFormValues;
