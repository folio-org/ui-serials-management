import deepDeleteKeys from './deepDeleteKeys';

const NOT_AFFECTING_ERRORS = ['templateConfig'];

export const isRulesetFormPreviewInvalid = ({ errors }) => {
  const affectingErrors = deepDeleteKeys(errors, NOT_AFFECTING_ERRORS);

  return Object.keys(affectingErrors).length > 0;
};
