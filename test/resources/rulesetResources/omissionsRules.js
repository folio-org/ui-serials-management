import { findRefdataValue } from '../utils';

export const dayWeekMonth = {
  id: '8b7e9470-9524-4a16-b2ae-99709865ad21',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'day'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'day_week_month'),
  pattern: {
    id: '73370b00-848e-4fa4-95bd-a947068253c5',
    week: 1,
    month: findRefdataValue('Global.Month', 'january'),
    weekday: findRefdataValue('Global.Weekday', 'monday'),
  },
};

export const dayMonth = {
  id: 'b22878a2-c8c2-4f41-bd09-c683a8d52e8e',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'day'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'day_month'),
  pattern: {
    id: 'f0235750-45af-47bd-bbca-b8d9b0b65f8a',
    month: findRefdataValue('Global.Month', 'january'),
    day: 1,
  },
};

export const dayWeek = {
  id: '68c46cdd-b394-4541-a971-1b850b27b49c',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'day'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'day_week'),
  pattern: {
    id: 'a09a09fa-78cb-4070-acd4-10753d447183',
    week: 7,
    weekday: findRefdataValue('Global.Weekday', 'monday'),
  },
};

export const day = {
  id: '969f96f2-a317-4f48-b6d6-19f7a6169e7c',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'day'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'day'),
  pattern: {
    id: '8135965a-ea9f-4d23-8941-af385f943860',
    day: 1,
  },
};

export const dayWeekday = {
  id: 'e60d38ce-158b-449f-82be-cb6f6d6e6bb9',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'day'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'day_weekday'),
  pattern: {
    id: '94222dc9-1494-4692-b933-0b94a9330e6f',
    weekday: findRefdataValue('Global.Weekday', 'monday'),
  },
};

export const weekMonth = {
  id: 'aefdb819-3743-4061-a1cd-3c224969ebbf',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'week'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'week_month'),
  pattern: {
    id: '4d2d86ea-7f98-4607-b758-774cfdc97743',
    week: 1,
    month: findRefdataValue('Global.Month', 'january'),
  },
};

export const week = {
  id: '2993d8d2-3b1e-4670-a75d-caae9660be66',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'week'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'week'),
  pattern: {
    id: '1b33c4af-91fd-4169-91c3-ebaeee94a27e',
    isRange: false,
    weekFrom: 1,
  },
};

export const weekRange = {
  id: 'd8978fa6-be59-4f80-ab3d-f82b3e90218d',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'week'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'week'),
  pattern: {
    id: '1798f825-d03f-4a7d-847b-1c60f2030a50',
    isRange: true,
    weekTo: 2,
    weekFrom: 1,
  },
};

export const month = {
  id: '4016dd97-021a-4bc1-9151-912be4d68631',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'month'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'month'),
  pattern: {
    id: 'b10130aa-4a7f-4ae6-9b95-f4cd86cb3e7d',
    monthFrom: findRefdataValue('Global.Month', 'january'),
    isRange: false,
  },
};

export const monthRange = {
  id: '3931aef3-fed2-45ad-916c-876419346013',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'month'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'month'),
  pattern: {
    id: '096e4a40-cbd5-425b-8604-96a60bf88ed2',
    monthTo: findRefdataValue('Global.Month', 'february'),
    monthFrom: findRefdataValue('Global.Month', 'january'),
    isRange: true,
  },
};

export const issue = {
  id: 'aade24d9-8f0c-41e9-a70e-4d789849fc08',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'issue'),
  pattern: {
    id: '16bed840-7d67-4ccd-acd7-5d6a59a63e2a',
    issue: 1,
  },
};

export const issueWeek = {
  id: '2d54c307-5883-468c-a9cb-9e13973b229d',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'issue_week'),
  pattern: {
    id: '74d79bd1-dede-4b9f-a623-27b95cd46450',
    week: 10,
    issue: 1,
  },
};

export const issueWeekMonth = {
  id: '549ade86-f26c-4cbe-b6ed-787c20c2cf99',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'issue_week_month'),
  pattern: {
    id: 'e2e95e68-97be-4f80-8752-422a1fbc0550',
    week: 1,
    month: findRefdataValue('Global.Month', 'january'),
    issue: 1,
  },
};

export const issueMonth = {
  id: 'e724322d-9d74-43e2-8b11-cc849b6d8043',
  timeUnit: findRefdataValue('OmissionRule.TimeUnits', 'issue'),
  patternType: findRefdataValue('OmissionRule.PatternType', 'issue_month'),
  pattern: {
    id: '7e97faaa-5b69-48d8-a322-072448b60e47',
    month: findRefdataValue('Global.Month', 'january'),
    issue: 1,
  },
};
