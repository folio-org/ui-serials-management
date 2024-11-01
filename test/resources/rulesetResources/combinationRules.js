import { findRefdataValue } from '../utils';

export const issueMonth = {
  id: '53b631a8-a752-4d8a-a48d-dadac2d6cb92',
  issuesToCombine: 2,
  timeUnit: findRefdataValue('CombinationRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('CombinationRule.PatternType', 'issue_month'),
  pattern: {
    id: '247ad702-262d-44c4-85e7-1f7f3c779126',
    month: findRefdataValue('Global.Month', 'february'),

    issue: 1,
  },
};

export const issueWeek = {
  id: '1acde9e3-c3dc-49de-9eef-6ecb0526cdf1',
  issuesToCombine: 2,
  timeUnit: findRefdataValue('CombinationRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('CombinationRule.PatternType', 'issue_week'),
  pattern: {
    id: '92c2bc63-fb1b-4e19-8952-214edc30a922',
    week: 2,
    issue: 1,
  },
};

export const issueWeekMonth = {
  id: 'f5629ab0-9e7e-4d28-9ab9-2419e7c1959a',
  issuesToCombine: 2,
  timeUnit: findRefdataValue('CombinationRule.TimeUnits', 'issue'),
  patternType: findRefdataValue(
    'CombinationRule.PatternType',
    'issue_week_month'
  ),
  pattern: {
    id: '3ad9a079-e1f9-4bfc-8422-fb8b45c6f939',
    week: 1,
    month: findRefdataValue('Global.Month', 'january'),
    issue: 1,
  },
};

export const issue = {
  id: '215e2466-b6e2-447e-aa9e-7d3b83615932',
  issuesToCombine: 2,
  timeUnit: findRefdataValue('CombinationRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('CombinationRule.PatternType', 'issue'),
  pattern: {
    id: '827eb1cb-c093-47c5-8c09-69f1586bec78',
    issue: 1,
  },
};
