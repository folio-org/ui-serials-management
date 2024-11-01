export const enumerationNumeric = {
  id: 'f9c26c17-6d69-4b05-9a94-8ac391f660ad',
  index: 3,
  templateMetadataRuleType: {
    id: '2c91809f92e7cf460192e7d9127b0055',
    value: 'enumeration',
    label: 'Enumeration',
  },
  ruleType: {
    id: '6fb7e0db-90ff-4e9e-bf8c-9fa56271061a',
    templateMetadataRuleFormat: {
      id: '2c91809f92e7cf460192e7d913b40060',
      value: 'enumeration_numeric',
      label: 'Numeric',
    },
    ruleFormat: {
      id: 'ba34e745-c626-4908-b17a-cd79366cb2b9',
      levels: [
        {
          id: '8b9dc71f-e0c4-4ee9-ac06-feff8747f953',
          index: 0,
          internalNote: 'Level 1',
          units: 1,
          sequence: {
            id: '2c91809f92e7cf460192e7d9109e0026',
            value: 'continuous',
            label: 'Continuous',
          },
          format: {
            id: '2c91809f92e7cf460192e7d910a80029',
            value: 'number',
            label: 'Number',
          },
        },
        {
          id: 'bf774633-3bb2-4a0d-813e-6bd16a8ea9f7',
          index: 1,
          internalNote: 'Level 2',
          units: 5,
          sequence: {
            id: '2c91809f92e7cf460192e7d910990025',
            value: 'reset',
            label: 'Reset',
          },
          format: {
            id: '2c91809f92e7cf460192e7d910a40028',
            value: 'ordinal',
            label: 'Ordinal',
          },
        },
      ],
    },
  },
};

export const enumerationTextual = {
  id: '94118695-3d28-4696-9732-ccb2e68158bb',
  index: 0,
  templateMetadataRuleType: {
    id: '2c91809f92e7cf460192e7d9127b0055',
    value: 'enumeration',
    label: 'Enumeration',
  },
  ruleType: {
    id: '216ee06c-0117-4713-9c25-398b9f4137e9',
    templateMetadataRuleFormat: {
      id: '2c91809f92e7cf460192e7d913b2005f',
      value: 'enumeration_textual',
      label: 'Textual',
    },
    ruleFormat: {
      id: '18b9bb72-aeef-43d3-9e83-b7e6df3b3eb9',
      levels: [
        {
          id: 'ac83f615-cad8-46be-9ea4-10c6d6a75f07',
          index: 0,
          internalNote: 'Order 1',
          units: 1,
          value: 'Friday',
        },
        {
          id: '01530c47-4a46-42e6-974f-12a08036c9f6',
          index: 1,
          internalNote: 'Order 2',
          units: 2,
          value: 'Monday',
        },
      ],
    },
  },
};
