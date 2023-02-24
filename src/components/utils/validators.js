import { FormattedMessage } from 'react-intl';

const validateMinMaxValue = (minValue, maxValue) => (value) => {
  return !value || (value <= maxValue && value >= minValue)
    ? undefined
    : 'Noooooooooo';
};

export default validateMinMaxValue;
