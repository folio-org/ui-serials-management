import { findRefdataValue } from '../utils';

export const chronologyDate = {
  id: '5000849c-7745-4ec6-a583-04a5b31e209d',
  index: 0,
  templateMetadataRuleType: findRefdataValue(
    'TemplateMetadataRule.TemplateMetadataRuleType',
    'chronology'
  ),
  ruleType: {
    id: 'a14ac8e2-d6ae-4887-aeb0-9343927e4dee',
    ruleLocale: 'en',
    templateMetadataRuleFormat: findRefdataValue(
      'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
      'chronology_date'
    ),
    ruleFormat: {
      id: 'd85e7ab6-824e-43bc-88af-0152b8877d9f',
      yearFormat: findRefdataValue('Global.YearFormat', 'full'),
      monthFormat: findRefdataValue('Global.MonthFormat', 'full'),
      weekdayFormat: findRefdataValue('Global.WeekdayFormat', 'full_lower'),
      monthDayFormat: findRefdataValue('Global.MonthDayFormat', 'number'),
    },
  },
};

export const chronologyMonth = {
  id: '920623d1-de6a-4916-957b-a6a00a8b84ef',
  index: 1,
  templateMetadataRuleType: findRefdataValue(
    'TemplateMetadataRule.TemplateMetadataRuleType',
    'chronology'
  ),
  ruleType: {
    id: 'f2f7ab49-bed0-49e2-ad14-e3d2d56e5bd6',
    ruleLocale: 'en',
    templateMetadataRuleFormat: findRefdataValue(
      'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
      'chronology_month'
    ),
    ruleFormat: {
      id: 'a252d854-5f73-4dcc-bf6e-c184543c1234',
      yearFormat: findRefdataValue('Global.YearFormat', 'full'),
      monthFormat: findRefdataValue('Global.MonthFormat', 'full'),
    },
  },
};

export const chronologyYear = {
  id: '6c14f945-ce66-4c30-aed7-fbb5a771a203',
  index: 2,
  templateMetadataRuleType: findRefdataValue(
    'TemplateMetadataRule.TemplateMetadataRuleType',
    'chronology'
  ),
  ruleType: {
    id: 'f663fcd3-5cb5-4878-b9fe-0f5eee24aed8',
    ruleLocale: 'en',
    templateMetadataRuleFormat: findRefdataValue(
      'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
      'chronology_year'
    ),
    ruleFormat: {
      id: 'be3fca50-21c3-438c-8dc0-fbfff4ea2c64',
      yearFormat: findRefdataValue('Global.YearFormat', 'full'),
    },
  },
};
