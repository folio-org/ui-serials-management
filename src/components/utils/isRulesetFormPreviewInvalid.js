const NOT_AFFECTING_ERRORS_SET = new Set(['templateConfig']);

export const isRulesetFormPreviewInvalid = ({ errors }) => {
  return Object
    .keys(errors)
    .some((key) => !NOT_AFFECTING_ERRORS_SET.has(key));
};
