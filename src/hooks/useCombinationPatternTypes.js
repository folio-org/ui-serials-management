import { useIntl } from 'react-intl';

const useCombinationPatternTypes = () => {
  const intl = useIntl();

  return {
    day: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (1-31), Month (Jan-Dec)`,
        value: 'day_month',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (Mon-Sun), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-52)`,
        value: 'day_week',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (Mon-Sun), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-4), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month',
        })} (Jan-Dec)`,
        value: 'day_week_month',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (1-31)`,
        value: 'day',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.day',
        })} (Mon-Sun)`,
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
          id: 'ui-serials-management.ruleset.week',
        })} (1-52)`,
        value: 'week',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-4), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month',
        })} (Jan-Dec)`,
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
          id: 'ui-serials-management.ruleset.month',
        })} (Jan-Dec)`,
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
          id: 'ui-serials-management.ruleset.issue',
        })} (1-n)`,
        value: 'issue',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue',
        })} (1-n), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-52)`,
        value: 'issue_week',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue',
        })} (1-n), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.week',
        })} (1-4), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month',
        })} (Jan-Dec)`,
        value: 'issue_week_month',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.ruleset.issue',
        })} (1-n), ${intl.formatMessage({
          id: 'ui-serials-management.ruleset.month',
        })} (Jan-Dec)`,
        value: 'issue_month',
      },
    ],
  };
};

export default useCombinationPatternTypes;
