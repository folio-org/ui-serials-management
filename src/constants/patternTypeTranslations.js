const RECURRENCE_PATTERN_TYPE_TRANSLATIONS = {
  month_date: {
    labels: [{ id: 'ui-serials-management.ruleset.day.monthRange' }],
  },
  month_weekday: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.weekdayRange' },
      { id: 'ui-serials-management.ruleset.week.monthRange' },
    ],
  },
  year_date: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.monthRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
  year_weekday: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.weekdayRange' },
      { id: 'ui-serials-management.ruleset.week.yearRange' },
    ],
  },
  year_month_weekday: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.weekdayRange' },
      { id: 'ui-serials-management.ruleset.week.monthRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
};

const OMISSION_COMBINATION_PATTERN_TYPE_TRANSLATIONS = {
  day_month: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.monthRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
  day_week: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.weekdayRange' },
      { id: 'ui-serials-management.ruleset.week.yearRange' },
    ],
  },
  day_week_month: {
    labels: [
      { id: 'ui-serials-management.ruleset.day.weekdayRange' },
      { id: 'ui-serials-management.ruleset.week.monthRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
  day: {
    labels: [{ id: 'ui-serials-management.ruleset.day.monthRange' }],
  },
  day_weekday: {
    labels: [{ id: 'ui-serials-management.ruleset.day.weekdayRange' }],
  },

  week: {
    labels: [{ id: 'ui-serials-management.ruleset.week.yearRange' }],
  },
  week_month: {
    labels: [
      { id: 'ui-serials-management.ruleset.week.monthRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
  month: {
    labels: [{ id: 'ui-serials-management.ruleset.month.yearRange' }],
  },

  issue: {
    labels: [{ id: 'ui-serials-management.ruleset.issue.nRange' }],
  },
  issue_week: {
    labels: [
      { id: 'ui-serials-management.ruleset.issue.nRange' },
      { id: 'ui-serials-management.ruleset.week.yearRange' },
    ],
  },
  issue_week_month: {
    labels: [
      { id: 'ui-serials-management.ruleset.issue.nRange' },
      { id: 'ui-serials-management.ruleset.week.monthRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
  issue_month: {
    labels: [
      { id: 'ui-serials-management.ruleset.issue.nRange' },
      { id: 'ui-serials-management.ruleset.month.yearRange' },
    ],
  },
};

export {
  RECURRENCE_PATTERN_TYPE_TRANSLATIONS,
  OMISSION_COMBINATION_PATTERN_TYPE_TRANSLATIONS,
};
