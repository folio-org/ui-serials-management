// These constants reflect the refdatavalues:
// 'Global.WeekdayFormat', 'Global.MonthDayFormat', 'Global.MonthFormat', 'Global.YearFormat, EnumerationNumericLevelTMRF.Format

const CHRONOLOGY_WEEKDAY_FORMAT = [
  { value: 'full_lower', id: 'ui-serials-management.ruleset.chronology.weekday.fullLower' },
  { value: 'full_upper', id: 'ui-serials-management.ruleset.chronology.weekday.fullUpper' },
  { value: 'slice_lower', id: 'ui-serials-management.ruleset.chronology.weekday.sliceLower' },
  { value: 'slice_upper', id: 'ui-serials-management.ruleset.chronology.weekday.sliceUpper' },
];

const CHRONOLOGY_MONTH_DAY_FORMAT = [
  { value: 'number', id: 'ui-serials-management.ruleset.chronology.monthDay.number' },
  { value: 'ordinal', id: 'ui-serials-management.ruleset.chronology.monthDay.ordinal' },
];

const CHRONOLOGY_MONTH_FORMAT = [
  { value: 'full', id: 'ui-serials-management.ruleset.chronology.month.full' },
  { value: 'number', id: 'ui-serials-management.ruleset.chronology.month.number' },
  { value: 'slice', id: 'ui-serials-management.ruleset.chronology.month.slice' },
];

const CHRONOLOGY_YEAR_FORMAT = [
  { value: 'full', id: 'ui-serials-management.ruleset.chronology.year.full' },
  { value: 'slice', id: 'ui-serials-management.ruleset.chronology.year.slice' },
];

const ENUMERATION_NUMBER_FORMAT = [
  { value: 'number', id: 'ui-serials-management.ruleset.enumeration.numberFormat.number' },
  { value: 'ordinal', id: 'ui-serials-management.ruleset.enumeration.numberFormat.ordinal' },
  { value: 'roman', id: 'ui-serials-management.ruleset.enumeration.numberFormat.roman' },
];

export {
  CHRONOLOGY_WEEKDAY_FORMAT,
  CHRONOLOGY_MONTH_DAY_FORMAT,
  CHRONOLOGY_MONTH_FORMAT,
  CHRONOLOGY_YEAR_FORMAT,
  ENUMERATION_NUMBER_FORMAT
};
