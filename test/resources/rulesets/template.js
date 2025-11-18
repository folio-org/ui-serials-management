import { chronologyYear } from '../rulesetResources/chronologyRules';
import { enumerationNumeric } from '../rulesetResources/enumerationRules';
import { monthDate } from '../rulesetResources/recurrences';
import { findRefdataValue } from '../utils';

const template = {
  'id': '45c8e041-7b02-42d3-89e6-e91220a20ecc',
  'dateCreated': '2025-11-18T13:36:44Z',
  'lastUpdated': '2025-11-18T13:36:44Z',
  'name': '#01 - monthly - Year / Volume / Issue: 12 issues per year',
  'serialRuleset': {
    'id': 'e4faba39-8cde-4cdf-ac91-6a227b650dfa',
    'dateCreated': '2025-11-18T13:36:44Z',
    'recurrence': monthDate,
    'lastUpdated': '2025-11-18T13:36:44Z',
    'rulesetStatus': findRefdataValue('SerialRuleset.RulesetStatus', 'active'),
    'owner': {
      'id': '45c8e041-7b02-42d3-89e6-e91220a20ecc'
    },
    'rulesetNumber': '8',
    'templateConfig': {
      'id': 'c03582f8-fa69-49df-a375-2becdb53f550',
      'chronologyRules': [{ ...chronologyYear, index: 0 }],
      'enumerationRules': [{ ...enumerationNumeric, index: 0 }],
      'templateString': 'Vol. {{enumeration1.level1}}, Issue {{enumeration1.level2}}. {{chronology1.year}}'
    }
  },
  'modelRulesetStatus': findRefdataValue('SerialRuleset.RulesetStatus', 'active'),
  'exampleLabel': 'Vol. 97, Issue 1. 2025',
  'description': '12x per year, two level of enumeration'
};

export default template;
