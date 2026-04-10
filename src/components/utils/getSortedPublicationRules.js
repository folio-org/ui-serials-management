import orderBy from 'lodash/orderBy';

import {
  SORTED_MONTHS,
  SORTED_WEEKDAYS,
} from '../../constants/sortedArrays';

// Push incomplete or unrecognized values to the end of the sorted output.
const LAST_SORT_VALUE = Number.MAX_SAFE_INTEGER;

const getNumericSortValue = (value) => {
  const parsed = Number(value);

  return parsed > 0 ? parsed : LAST_SORT_VALUE;
};

const getRefdataSortValue = (value) => {
  if (typeof value === 'string') return value;

  return value?.value;
};

const getOrdinalSortValue = (rule) => getNumericSortValue(rule?.ordinal);
const getDaySortValue = (rule) => getNumericSortValue(rule?.pattern?.day);
const getWeekSortValue = (rule) => getNumericSortValue(rule?.pattern?.week);

const getMonthSortValue = (rule) => {
  const month = getRefdataSortValue(rule?.pattern?.month)?.toLowerCase();
  const monthIndex = SORTED_MONTHS.indexOf(month);

  return monthIndex === -1 ? LAST_SORT_VALUE : monthIndex;
};

const getWeekdaySortValue = (rule) => {
  const weekday = getRefdataSortValue(rule?.pattern?.weekday)?.toLowerCase();
  const weekdayIndex = SORTED_WEEKDAYS.indexOf(weekday);

  return weekdayIndex === -1 ? LAST_SORT_VALUE : weekdayIndex;
};

// Each pattern type uses its own cycle-order rules from broadest to narrowest field.
const PATTERN_TYPE_SORTERS = {
  day: [getOrdinalSortValue],
  week: [getOrdinalSortValue, getWeekdaySortValue],
  month_date: [getOrdinalSortValue, getDaySortValue],
  month_weekday: [getOrdinalSortValue, getWeekSortValue, getWeekdaySortValue],
  year_date: [getOrdinalSortValue, getMonthSortValue, getDaySortValue],
  year_weekday: [getOrdinalSortValue, getWeekSortValue, getWeekdaySortValue],
  year_month_weekday: [getOrdinalSortValue, getMonthSortValue, getWeekdaySortValue],
};

const getSortedPublicationRules = (rules = [], patternType) => {
  // Fall back to ordinal sorting if no pattern-specific rule is defined.
  const sorters = PATTERN_TYPE_SORTERS[patternType] ?? [getOrdinalSortValue];

  return orderBy(rules, sorters, Array(sorters.length).fill('asc'));
};

export default getSortedPublicationRules;
