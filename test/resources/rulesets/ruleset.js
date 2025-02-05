import { chronologyYear } from '../rulesetResources/chronologyRules';
import { enumerationNumeric } from '../rulesetResources/enumerationRules';
import { monthDate } from '../rulesetResources/recurrences';
import { findRefdataValue } from '../utils';

const ruleset = {
  id: 'a3a45cc5-5c16-46aa-93a3-e64bb4defef0',
  dateCreated: '2024-03-21T09:02:39Z',
  rulesetNumber: 'Test Pattern ID',
  recurrence: monthDate,
  lastUpdated: '2024-03-21T09:02:39Z',
  rulesetStatus: findRefdataValue('SerialRuleset.RulesetStatus', 'active'),
  // Cant reference serial due to cyclical dependency
  owner: {
    id: '9be5cebf-c676-4430-9439-4f47973d8a47',
  },
  templateConfig: {
    id: 'e6f9dad2-88f0-429e-8686-beddf4c8088a',
    chronologyRules: [
      { ...chronologyYear, index: 0 },
    ],
    enumerationRules: [
      { ...enumerationNumeric, index: 0 },
    ],
    templateString:
      'Vol:{{enumeration1.level1}} Issue:{{enumeration1.level2}}, {{chronology1.year}}',
  },
  startDate: '2024-03-21',
};

export default ruleset;
