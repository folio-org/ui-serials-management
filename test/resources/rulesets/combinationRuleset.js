import { chronologyDate } from '../rulesetResources/chronologyRules';
import { issue } from '../rulesetResources/combinationRules';
import { monthDate } from '../rulesetResources/recurrences';
import { findRefdataValue } from '../utils';

const combinationRuleset = {
  id: '1dc064f2-2409-4cdb-9502-f1e186a9a5c7',
  combination: {
    id: '02143bbc-f68c-4156-9ec8-c440c5d39157',
    rules: [issue],
  },
  dateCreated: '2024-11-05T14:08:44Z',
  recurrence: monthDate,
  lastUpdated: '2024-11-05T14:08:44Z',
  rulesetStatus: findRefdataValue('SerialRuleset.RulesetStatus', 'draft'),
  owner: {
    id: '9be5cebf-c676-4430-9439-4f47973d8a47',
  },
  rulesetNumber: '5',
  templateConfig: {
    id: '28cb5cab-ce30-4b48-8d1b-2c7f86b2232e',
    chronologyRules: [chronologyDate],
    templateString:
      '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
  },
  description: 'Month date with combination on first and second issue',
};

export default combinationRuleset;
