const ruleset = {
  id: 'a3a45cc5-5c16-46aa-93a3-e64bb4defef0',
  dateCreated: '2024-03-21T09:02:39Z',
  recurrence: {
    id: '22c08b1e-d71e-4808-bc40-239e7a3a88a1',
    rules: [
      {
        id: '7dacfd4f-fade-4fc8-b3cd-3e5b1a2369da',
        ordinal: 1,
        pattern: {
          id: '3cab39a1-95fe-4e7c-96d8-2597d6d66632',
          day: 12,
        },
      },
    ],
    timeUnit: {
      id: '2c9180a48e5e2369018e5e2bf5170039',
      value: 'month',
      label: 'Month',
    },
    period: 1,
    issues: 1,
  },
  lastUpdated: '2024-03-21T09:02:39Z',
  rulesetStatus: {
    id: '2c9180a48e5e2369018e5e2bf5030033',
    value: 'active',
    label: 'Active',
  },
  owner: {
    id: '9be5cebf-c676-4430-9439-4f47973d8a47',
  },
  templateConfig: {
    id: 'e6f9dad2-88f0-429e-8686-beddf4c8088a',
    rules: [
      {
        id: '5063b6ad-50a9-4735-90a1-a3bdb00fe3c4',
        index: 0,
        templateMetadataRuleType: {
          id: '2c9180a48e5e2369018e5e2bf3f00025',
          value: 'chronology',
          label: 'Chronology',
        },
        ruleType: {
          id: '8e62f90a-933b-46c5-a272-c57250a59d72',
          templateMetadataRuleFormat: {
            id: '2c9180a48e5e2369018e5e2bf6540053',
            value: 'chronology_year',
            label: 'Chronology Year',
          },
          ruleFormat: {
            id: 'd711ec1a-00fa-439a-ba18-5decf19806ec',
            yearFormat: {
              id: '2c9180a48e5e2369018e5e2bf3520016',
              value: 'full',
              label: 'Full',
            },
          },
        },
      },
      {
        id: '4ad0a3e6-5bef-424f-b1c3-e4042af3a282',
        index: 1,
        templateMetadataRuleType: {
          id: '2c9180a48e5e2369018e5e2bf3f60026',
          value: 'enumeration',
          label: 'Enumeration',
        },
        ruleType: {
          id: '55ca8597-a19d-40a2-a0ee-01e46d506efd',
          templateMetadataRuleFormat: {
            id: '2c9180a48e5e2369018e5e2bf520003c',
            value: 'enumeration_numeric',
            label: 'Enumeration Numeric',
          },
          ruleFormat: {
            id: '25b06c97-ec47-4d23-a704-fe8030e96781',
            levels: [
              {
                id: 'a7954729-7f84-4f63-89a8-4454056a1b70',
                index: 0,
                units: 1,
                sequence: {
                  id: '2c9180a48e5e2369018e5e2bf69e005d',
                  value: 'continuous',
                  label: 'Continuous',
                },
                format: {
                  id: '2c9180a48e5e2369018e5e2bf6a50060',
                  value: 'number',
                  label: 'Number',
                },
                startingValue: '1',
              },
              {
                id: '344aa1ef-3e70-4988-95c1-afe869ae7370',
                index: 1,
                units: 12,
                sequence: {
                  id: '2c9180a48e5e2369018e5e2bf69a005c',
                  value: 'reset',
                  label: 'Reset',
                },
                format: {
                  id: '2c9180a48e5e2369018e5e2bf6a50060',
                  value: 'number',
                  label: 'Number',
                },
                startingValue: '1',
              },
            ],
          },
        },
      },
    ],
    templateString:
      'Vol:{{enumeration1.level1}} Issue:{{enumeration1.level2}}, {{chronology1.year}}',
  },
  startDate: '2024-03-21',
};

export default ruleset;
