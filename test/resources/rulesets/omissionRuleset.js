import { chronologyDate } from '../rulesetResources/chronologyRules';
import { dayMonth } from '../rulesetResources/omissionsRules';
import { monthDate } from '../rulesetResources/recurrences';
import { findRefdataValue } from '../utils';

const omissionRuleset = {
  id: '908b1ffa-0ef5-4ead-899d-98b69c058479',
  dateCreated: '2024-11-05T12:21:30Z',
  recurrence: monthDate,
  lastUpdated: '2024-11-05T12:21:30Z',
  rulesetStatus: findRefdataValue('SerialRuleset.RulesetStatus', 'deprecated'),
  owner: {
    id: '9be5cebf-c676-4430-9439-4f47973d8a47',
  },
  rulesetNumber: '3',
  omission: {
    id: 'ad30e8c1-55b3-4a4d-ad7e-57f0efe84be9',
    rules: [dayMonth],
  },
  templateConfig: {
    id: '154f5edc-883e-4066-b0c4-ba7b91497ed7',
    rules: [chronologyDate],
    templateString:
      '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
  },
};

export default omissionRuleset;
