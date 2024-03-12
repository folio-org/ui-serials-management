import { useIntl } from 'react-intl';

const useRecurrencePatternTypes = () => {
  const intl = useIntl();

  return {
    month: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.monthRange',
        })}`,
        value: 'month_date',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.weekdayRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.monthRange',
        })}`,
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
          id: 'ui-serials-management.ruleset.day.monthRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'year_date',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.weekdayRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.yearRange',
        })}`,
        value: 'year_weekday',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.weekdayRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.monthRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'year_month_weekday',
      },
    ],
  };
};

export default useRecurrencePatternTypes;
