import { FormattedMessage } from 'react-intl';

const validateWithinRange = (minValue, maxValue, customMessage) => (value) => {
  return !value ||
    (Number(value) <= Number(maxValue) &&
      Number(value) >= Number(minValue)) ? undefined : (
      customMessage ?? <FormattedMessage
        id="ui-serials-management.validate.withinRange"
        values={{ minValue, maxValue }}
      />
    );
};

const validateNotNegative = (value) => {
  return !value || value > 0 ? undefined : (
    <FormattedMessage id="ui-serials-management.validate.notNegative" />
  );
};

const validateWholeNumber = (value) => {
  const regexp = /^\d+$/;
  return !value || regexp.test(value) ? undefined : (
    <FormattedMessage id="ui-serials-management.validate.wholeNumber" />
  );
};

export { validateWithinRange, validateNotNegative, validateWholeNumber };
