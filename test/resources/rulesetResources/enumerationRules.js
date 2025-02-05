import { findRefdataValue } from '../utils';

export const enumerationNumeric = {
  id: '6fb7e0db-90ff-4e9e-bf8c-9fa56271061a',
  index: 0,
  templateMetadataRuleFormat: findRefdataValue(
    'EnumerationTemplateMetadataRule.TemplateMetadataRuleFormat',
    'enumeration_numeric'
  ),
  ruleFormat: {
    id: 'ba34e745-c626-4908-b17a-cd79366cb2b9',
    levels: [
      {
        id: '8b9dc71f-e0c4-4ee9-ac06-feff8747f953',
        index: 0,
        internalNote: 'Level 1',
        units: 1,
        sequence: findRefdataValue(
          'EnumerationNumericLevelTMRF.Sequence',
          'continuous'
        ),
        format: findRefdataValue(
          'EnumerationNumericLevelTMRF.Format',
          'number'
        ),
      },
      {
        id: 'bf774633-3bb2-4a0d-813e-6bd16a8ea9f7',
        index: 1,
        internalNote: 'Level 2',
        units: 5,
        sequence: findRefdataValue(
          'EnumerationNumericLevelTMRF.Sequence',
          'reset'
        ),
        format: findRefdataValue(
          'EnumerationNumericLevelTMRF.Format',
          'ordinal'
        ),
      },
    ],
  },
};

export const enumerationTextual = {
  id: '216ee06c-0117-4713-9c25-398b9f4137e9',
  index: 1,
  templateMetadataRuleFormat: findRefdataValue(
    'EnumerationTemplateMetadataRule.TemplateMetadataRuleFormat',
    'enumeration_textual'
  ),
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
};
