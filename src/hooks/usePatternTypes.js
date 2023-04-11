import { useIntl } from 'react-intl';

const usePatternTypes = () => {
  const intl = useIntl();

  return {
    month: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (1-31)`,
        value: 'month_date',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (Mon-Sun), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-4)`,
        value: 'month_weekday',
      },
    ],

    year: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (1-31), Month (Jan-Dec)`,
        value: 'year_date',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (Mon-Sun), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-52)`,
        value: 'year_weekday',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (1-31), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-4), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month',
        })} (Jan-Dec)`,
        value: 'year_month_weekday',
      },
    ],
  };
};

export default usePatternTypes;
