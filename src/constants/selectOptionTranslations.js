// TODO This needs to be handled by translations or some other system to allow for internationalisation

const CHRONOLOGY_WEEKDAY_FORMAT = [
  { value: 'full_lower', label: 'Monday' },
  { value: 'full_upper', label: 'MONDAY' },
  { value: 'slice_lower', label: 'Mon' },
  { value: 'slice_upper', label: 'MON' },
];

const CHRONOLOGY_MONTH_DAY_FORMAT = [
  { value: 'number', label: '3' },
  { value: 'ordinal', label: '3rd' },
];

const CHRONOLOGY_MONTH_FORMAT = [
  { value: 'full', label: 'October' },
  { value: 'number', label: '8' },
  { value: 'slice', label: 'Oct' },
];

const CHRONOLOGY_YEAR_FORMAT = [
  { value: 'full', label: '2023' },
  { value: 'slice', label: '23' },
];

const ENUMERATION_NUMBER_FORMAT = [
  { value: 'number', label: 'Number (1, 2, 3)' },
  { value: 'ordinal', label: 'Ordinal (1st, 2nd, 3rd)' },
  { value: 'roman', label: 'Roman numerals (I, II, III)' },
];

export {
  CHRONOLOGY_WEEKDAY_FORMAT,
  CHRONOLOGY_MONTH_DAY_FORMAT,
  CHRONOLOGY_MONTH_FORMAT,
  CHRONOLOGY_YEAR_FORMAT,
  ENUMERATION_NUMBER_FORMAT
};
