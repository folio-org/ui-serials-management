const ruleset = {
  'id': 'f3aca74f-f795-461c-b9af-df7e8f49c1c5',
  'dateCreated': '2024-03-12T10:21:27Z',
  'recurrence': {
    'id': '256b4193-73bb-4756-9cac-4ad8d7b20cd7',
    'rules': [
      {
        'id': 'b2afed12-8cc7-4c1b-918f-c31a4aaaa3f2',
        'ordinal': 1,
        'pattern': {
          'id': '92d9e9b2-6abd-4f70-86fe-a8a0d95835f3',
          'day': 1,
        },
      },
    ],
    'timeUnit': {
      'id': '2c9180a58e305768018e30605a480034',
      'value': 'month',
      'label': 'Month',
    },
    'period': 2,
    'issues': 1,
  },
  'lastUpdated': '2024-03-12T10:21:27Z',
  'rulesetStatus': {
    'id': '2c9180a58e305768018e3060598b002e',
    'value': 'active',
    'label': 'Active',
  },
  'owner': {
    'id': 'e45a5fb2-4b61-4389-be9c-c73eb54ee7f2',
  },
  'templateConfig': {
    'id': '8eb9579b-603c-46a5-b91f-7357f369c03d',
    'rules': [
      {
        'id': '42da0b3d-6a7d-4255-8842-6f73e5601756',
        'index': 0,
        'templateMetadataRuleType': {
          'id': '2c9180a58e305768018e306057700001',
          'value': 'chronology',
          'label': 'Chronology',
        },
        'ruleType': {
          'id': 'bf488f70-c487-4a5a-8b7d-234b974edfb3',
          'templateMetadataRuleFormat': {
            'id': '2c9180a58e305768018e30605baf0040',
            'value': 'chronology_year',
            'label': 'Chronology Year',
          },
          'ruleFormat': {
            'id': '43868b68-5f72-4d23-bd17-9edc563adf6e',
            'yearFormat': {
              'id': '2c9180a58e305768018e3060585e0019',
              'value': 'full',
              'label': 'Full',
            },
          },
        },
      },
      {
        'id': 'b4d6fa66-9c16-469b-89f1-03e1053befa6',
        'index': 1,
        'templateMetadataRuleType': {
          'id': '2c9180a58e305768018e306057850002',
          'value': 'enumeration',
          'label': 'Enumeration',
        },
        'ruleType': {
          'id': 'c7dde1ab-eef7-4599-b898-e416b996d667',
          'templateMetadataRuleFormat': {
            'id': '2c9180a58e305768018e3060593d002b',
            'value': 'enumeration_numeric',
            'label': 'Enumeration Numeric',
          },
          'ruleFormat': {
            'id': '05d734fd-4f4e-420c-a071-f9d0641ccdce',
            'levels': [
              {
                'id': '99f12a02-c3a6-4863-a7e8-b8227798aa8f',
                'index': 0,
                'units': 2,
                'sequence': {
                  'id': '2c9180a58e305768018e30605a580038',
                  'value': 'continuous',
                  'label': 'Continuous',
                },
                'format': {
                  'id': '2c9180a58e305768018e30605a63003b',
                  'value': 'number',
                  'label': 'Number',
                },
                'startingValue': '1',
              },
              {
                'id': '8e9d4e4e-773e-47e3-896b-71dc407c7fd5',
                'index': 1,
                'units': 3,
                'sequence': {
                  'id': '2c9180a58e305768018e30605a540037',
                  'value': 'reset',
                  'label': 'Reset',
                },
                'format': {
                  'id': '2c9180a58e305768018e30605a63003b',
                  'value': 'number',
                  'label': 'Number',
                },
                'startingValue': '1',
              },
            ],
          },
        },
      },
    ],
    'templateString':
      'Vol. {{enumeration1.level1}}.{{chronology1.year}}, Heft {{enumeration1.level2}}',
  },
};

export default ruleset;
