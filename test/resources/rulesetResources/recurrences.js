export const day = {
  id: '203a65ed-a063-49f9-a638-ef5fd92a8528',
  rules: [
    {
      id: '2370f079-a2a3-4c13-8497-463bfe94c3ec',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4ac9003e',
        value: 'day',
        label: 'Day',
      },
      pattern: {
        id: '0b8dbbf5-62c9-4d9e-9a57-5e4afac82bab',
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4ba80054',
    value: 'day',
    label: 'Day',
  },
  period: 1,
  issues: 1,
};

export const week = {
  id: 'a0a675bf-9a22-46c0-bbdc-40e0959f896d',
  rules: [
    {
      id: '7422a424-043b-4836-88a0-a10e96362874',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4acc003f',
        value: 'week',
        label: 'Week',
      },
      pattern: {
        id: '034aa580-b7c6-496f-93be-b3e3ad1499e9',
        weekday: {
          id: '2c91809f92e151a60192e15b495e000e',
          value: 'monday',
          label: 'Monday',
        },
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4bac0055',
    value: 'week',
    label: 'Week',
  },
  period: 1,
  issues: 1,
};

export const monthDate = {
  id: 'de76e3c5-e137-4007-888a-3fa7e785440a',
  rules: [
    {
      id: 'a988fde3-39ce-4dca-9401-67c2d81030d3',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4ad00040',
        value: 'month_date',
        label: 'Month Date',
      },
      pattern: {
        id: '8afea6d7-c85a-4aa2-8ac0-70b87b7bf4f8',
        day: 1,
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4baf0056',
    value: 'month',
    label: 'Month',
  },
  period: 1,
  issues: 1,
};

export const monthWeekday = {
  id: 'f3eb48aa-2f0a-4f68-9b3b-05a159057f59',
  rules: [
    {
      id: '6cf69dc7-f77b-4ae1-983d-76e68df8065e',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4ad40041',
        value: 'month_weekday',
        label: 'Month Weekday',
      },
      pattern: {
        id: '9aa2f4a8-3948-45c5-970a-6d10be08ebe7',
        week: 1,
        weekday: {
          id: '2c91809f92e151a60192e15b495e000e',
          value: 'monday',
          label: 'Monday',
        },
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4baf0056',
    value: 'month',
    label: 'Month',
  },
  period: 1,
  issues: 1,
};

export const yearDate = {
  id: '00cff0f8-01f3-480e-8bde-d966c5674a02',
  rules: [
    {
      id: '02ee852b-90aa-458c-a8f0-68db7866a17a',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4ad80042',
        value: 'year_date',
        label: 'Year Date',
      },
      pattern: {
        id: 'a4d6375d-7b6d-41e0-a17b-2e107e518953',
        month: {
          id: '2c91809f92e151a60192e15b48e30002',
          value: 'february',
          label: 'February',
        },
        day: 1,
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4bb30057',
    value: 'year',
    label: 'Year',
  },
  period: 1,
  issues: 1,
};

export const yearWeekday = {
  id: 'ce703e71-73ae-415f-9016-c2cefbf81569',
  rules: [
    {
      id: 'ce443ddd-6d32-4bd3-87a1-f5f17d04ce97',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4adc0043',
        value: 'year_weekday',
        label: 'Year Weekday',
      },
      pattern: {
        id: 'cde8916a-4553-4405-8d8b-8e346b4861ab',
        week: 1,
        weekday: {
          id: '2c91809f92e151a60192e15b495e000e',
          value: 'monday',
          label: 'Monday',
        },
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4bb30057',
    value: 'year',
    label: 'Year',
  },
  period: 1,
  issues: 1,
};

export const yearMonthWeekday = {
  id: 'fe5abeea-4a3e-41ff-9f77-6adcee230837',
  rules: [
    {
      id: '01116263-dc77-461e-846b-1cd96c46899b',
      ordinal: 1,
      patternType: {
        id: '2c91809f92e151a60192e15b4ae00044',
        value: 'year_month_weekday',
        label: 'Year Month Weekday',
      },
      pattern: {
        id: '398f4052-7b87-42e7-a805-53a8dd47a1f8',
        week: 1,
        month: {
          id: '2c91809f92e151a60192e15b48d40001',
          value: 'january',
          label: 'January',
        },
        weekday: {
          id: '2c91809f92e151a60192e15b495e000e',
          value: 'monday',
          label: 'Monday',
        },
      },
    },
  ],
  timeUnit: {
    id: '2c91809f92e151a60192e15b4bb30057',
    value: 'year',
    label: 'Year',
  },
  period: 1,
  issues: 1,
};
