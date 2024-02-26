const pieceSet = {
  id: 'daa8a40a-8da5-441d-adb8-7e98470df1f8',
  startDate: '2024-02-01',
  ruleset: {
    id: '87edca46-4cff-45c4-9023-3aa20d09330b',
    dateCreated: '2024-02-26T09:58:59Z',
    recurrence: {
      id: '117033e7-a807-4012-b2f6-12036198c398',
      rules: [
        {
          id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
          ordinal: 1,
          patternType: {
            id: '2c9180a58de0851d018de08d8eea0021',
            value: 'month_date',
            label: 'Month Date',
          },
          pattern: {
            id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
            day: 1,
          },
        },
      ],
      timeUnit: {
        id: '2c9180a58de0851d018de08d918d005c',
        value: 'month',
        label: 'Month',
      },
      period: 1,
      issues: 1,
    },
    lastUpdated: '2024-02-26T09:58:59Z',
    rulesetStatus: {
      id: '2c9180a58de0851d018de08d8f460027',
      value: 'active',
      label: 'Active',
    },
    owner: {
      id: '9be5cebf-c676-4430-9439-4f47973d8a47',
    },
    templateConfig: {
      id: 'f5217917-0e2c-4e11-9adc-9769841676f2',
      rules: [
        {
          id: 'd30fde65-c7eb-4e01-98b0-fa9ca16167fe',
          index: 0,
          templateMetadataRuleType: {
            id: '2c9180a58de0851d018de08d90b4003f',
            value: 'enumeration',
            label: 'Enumeration',
          },
          ruleType: {
            id: '92f59b68-056a-4f9d-86af-7190fef9b762',
            templateMetadataRuleFormat: {
              id: '2c9180a58de0851d018de08d8ed5001c',
              value: 'enumeration_numeric',
              label: 'Enumeration Numeric',
            },
            ruleFormat: {
              id: '7459d9e9-6049-44be-b773-e6836205bcfc',
              levels: [
                {
                  id: '30ca0123-a758-4054-8c3b-4d85270738aa',
                  index: 0,
                  units: 2,
                  sequence: {
                    id: '2c9180a58de0851d018de08d909e0038',
                    value: 'continuous',
                    label: 'Continuous',
                  },
                  format: {
                    id: '2c9180a58de0851d018de08d90a7003b',
                    value: 'number',
                    label: 'Number',
                  },
                },
                {
                  id: 'fceb4e8b-41bd-4b7f-ae18-3a5c36d17e65',
                  index: 1,
                  units: 2,
                  sequence: {
                    id: '2c9180a58de0851d018de08d909e0038',
                    value: 'continuous',
                    label: 'Continuous',
                  },
                  format: {
                    id: '2c9180a58de0851d018de08d90a7003b',
                    value: 'number',
                    label: 'Number',
                  },
                },
              ],
            },
          },
        },
      ],
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
    },
  },
  pieces: [
    {
      id: '6882640f-7110-4dc5-9617-29ad06736adf',
      date: '2024-10-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '5 9',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '40b2ddbb-76d5-48bd-a97a-5e6a198ae5ce',
      date: '2024-07-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '3 6',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '42b0f812-f00d-4311-aaed-0dc93f11ded8',
      date: '2025-01-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '6 12',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '7afc653e-63c3-4481-a0fd-b6bf0aa3b7cb',
      date: '2024-04-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '2 3',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '8e6ac19f-39cd-401a-86a5-b721ca9ecf62',
      date: '2024-09-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '4 8',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: 'e445eccb-d7f1-49c1-b5e0-eceb8c3788c1',
      date: '2024-06-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '3 5',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: 'dad2d359-ec4d-4823-8fc7-d79e3124ca79',
      date: '2024-03-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '1 2',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: 'de5b189f-925f-4d98-9dd9-8a908b561c40',
      date: '2024-02-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '1 1',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '7e0d1860-9c10-4138-8a82-93882d90b0e9',
      date: '2024-12-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '6 11',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '7bd11cf1-0099-4cb0-bca0-ec87c7ce4b4a',
      date: '2024-08-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '4 7',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: '4a7d8a23-84af-4d67-a4af-6d6c3323c810',
      date: '2024-11-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '5 10',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
    {
      id: 'ebab9957-0780-48a3-a190-f1004317daf1',
      date: '2024-05-01',
      templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      label: '2 4',
      recurrenceRule: {
        id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
        ordinal: 1,
        patternType: {
          id: '2c9180a58de0851d018de08d8eea0021',
          value: 'month_date',
          label: 'Month Date',
        },
        pattern: {
          id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
          day: 1,
        },
      },
    },
  ],
  dateCreated: '2024-02-26T10:02:37Z',
  lastUpdated: '2024-02-26T10:02:37Z',
};

export default pieceSet;
