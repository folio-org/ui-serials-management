const ruleset = {
  id: 'c9f0d8bf-0165-4373-a3e1-8c0d76b91cf0',
  dateCreated: '2024-03-15T08:20:56Z',
  recurrence: {
    id: 'd7f4f059-70c3-4186-b463-173e48e881bd',
    rules: [
      {
        id: 'b89cda74-d186-4c50-aa8c-80cd566595b2',
        ordinal: 1,
        patternType: {
          id: '2c9180a58e3fc817018e3fd0b9240058',
          value: 'day',
          label: 'Day',
        },
        pattern: {
          id: 'e0296d0d-697c-4269-8fc6-89de71d59cbd',
        },
      },
    ],
    timeUnit: {
      id: '2c9180a58e3fc817018e3fd0b8ab004d',
      value: 'day',
      label: 'Day',
    },
    period: 1,
    issues: 1,
  },
  lastUpdated: '2024-03-15T08:20:56Z',
  rulesetStatus: {
    id: '2c9180a58e3fc817018e3fd0b70c001d',
    value: 'active',
    label: 'Active',
  },
  owner: {
    id: '42085e29-aa74-418b-9f47-88d50928f26a',
  },
  templateConfig: {
    id: '516192d8-96e3-4fa6-99af-621f9844b478',
    rules: [
      {
        id: 'ec2eb639-450e-4516-ab97-f25166731036',
        index: 0,
        templateMetadataRuleType: {
          id: '2c9180a58e3fc817018e3fd0b8db0052',
          value: 'chronology',
          label: 'Chronology',
        },
        ruleType: {
          id: 'cdc20f40-f740-4923-8372-1d2b838cf43a',
          templateMetadataRuleFormat: {
            id: '2c9180a58e3fc817018e3fd0b8440049',
            value: 'chronology_date',
            label: 'Chronology Date',
          },
          ruleFormat: {
            id: 'a8598f1a-4ea3-4c0e-9edb-2c8fcec4a0fa',
            yearFormat: {
              id: '2c9180a58e3fc817018e3fd0b5620001',
              value: 'full',
              label: 'Full',
            },
            monthFormat: {
              id: '2c9180a58e3fc817018e3fd0b57d0004',
              value: 'full',
              label: 'Full',
            },
            weekdayFormat: {
              id: '2c9180a58e3fc817018e3fd0b7760023',
              value: 'full_lower',
              label: 'Full Lower',
            },
            monthDayFormat: {
              id: '2c9180a58e3fc817018e3fd0b7800026',
              value: 'ordinal',
              label: 'Ordinal',
            },
          },
        },
      },
    ],
    templateString:
      '{{chronology1.weekday}}, {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
  },
  description: 'ZSS',
};

export default ruleset;
