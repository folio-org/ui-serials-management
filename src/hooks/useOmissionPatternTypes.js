import { useIntl } from 'react-intl';

const useOmissionPatternTypes = () => {
  const intl = useIntl();

  return {
    day: [
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
        value: 'day_month',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.weekdayRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.yearRange',
        })}`,
        value: 'day_week',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.weekdayRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.monthRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'day_week_month',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.monthRange',
        })}`,
        value: 'day',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day.weekdayRange',
        })}`,
        value: 'day_weekday',
      },
    ],

    week: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.yearRange',
        })}`,
        value: 'week',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.monthRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'week_month',
      },
    ],

    month: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'month',
      },
    ],

    issue: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue.nRange',
        })}`,
        value: 'issue',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue.nRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.yearRange',
        })}`,
        value: 'issue_week',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue.nRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week.monthRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'issue_week_month',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue.nRange',
        })}, ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month.yearRange',
        })}`,
        value: 'issue_month',
      },
    ],
  };
};

export default useOmissionPatternTypes;
