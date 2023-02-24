import { FormattedMessage } from 'react-intl';

const validateWithinRange = (minValue, maxValue) => (value) => {
  return !value || (value <= maxValue && value >= minValue) ? undefined : (
    <FormattedMessage
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

export { validateWithinRange, validateNotNegative };
