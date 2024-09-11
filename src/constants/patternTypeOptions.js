const RECURRENCE_PATTERN_TYPE_OPTIONS = {
  month: [
    {
      labels: [{ id: 'ui-serials-management.ruleset.day.monthRange' }],
      value: 'month_date',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.weekdayRange' },
        { id: 'ui-serials-management.ruleset.week.monthRange' },
      ],
      value: 'month_weekday',
    },
  ],

  year: [
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.monthRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'year_date',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.weekdayRange' },
        { id: 'ui-serials-management.ruleset.week.yearRange' },
      ],
      value: 'year_weekday',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.weekdayRange' },
        { id: 'ui-serials-management.ruleset.week.monthRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'year_month_weekday',
    },
  ],
};

const OMISSION_COMBINATION_PATTERN_TYPE_OPTIONS = {
  day: [
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.monthRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'day_month',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.weekdayRange' },
        { id: 'ui-serials-management.ruleset.week.yearRange' },
      ],
      value: 'day_week',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.day.weekdayRange' },
        { id: 'ui-serials-management.ruleset.week.monthRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'day_week_month',
    },
    {
      labels: [{ id: 'ui-serials-management.ruleset.day.monthRange' }],
      value: 'day',
    },
    {
      labels: [{ id: 'ui-serials-management.ruleset.day.weekdayRange' }],
      value: 'day_weekday',
    },
  ],

  week: [
    {
      labels: [{ id: 'ui-serials-management.ruleset.week.yearRange' }],
      value: 'week',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.week.monthRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'week_month',
    },
  ],

  month: [
    {
      labels: [{ id: 'ui-serials-management.ruleset.month.yearRange' }],
      value: 'month',
    },
  ],

  issue: [
    {
      labels: [{ id: 'ui-serials-management.ruleset.issue.nRange' }],
      value: 'issue',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.issue.nRange' },
        { id: 'ui-serials-management.ruleset.week.yearRange' },
      ],
      value: 'issue_week',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.issue.nRange' },
        { id: 'ui-serials-management.ruleset.week.monthRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'issue_week_month',
    },
    {
      labels: [
        { id: 'ui-serials-management.ruleset.issue.nRange' },
        { id: 'ui-serials-management.ruleset.month.yearRange' },
      ],
      value: 'issue_month',
    },
  ],
};

export {
  RECURRENCE_PATTERN_TYPE_OPTIONS,
  OMISSION_COMBINATION_PATTERN_TYPE_OPTIONS,
};
