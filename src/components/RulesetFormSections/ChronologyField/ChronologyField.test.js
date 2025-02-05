import {
  renderWithIntl,
  TestForm,
  Select,
  testSelect,
} from '@folio/stripes-erm-testing';

import ChronologyField from './ChronologyField';

import { translationsProperties } from '../../../../test/helpers';
import mockRefdata from '../../../../test/resources/refdata';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const onSubmit = jest.fn();

// These are the name, label and options for all selectors rendered by the chronology field
// Options array should be use findRefDataCategory values, however due to weird translation stuff we do it has to be like this
// See selectOptionTranslations as to why
const weekdaySelector = {
  selector: {
    name: 'templateConfig.chronologyRules[0].ruleFormat.weekdayFormat.value',
  },
  selectorName: 'Weekday format*',
  optionsArray: ['Monday', 'MONDAY', 'Mon', 'MON', ''],
};
const monthDaySelector = {
  selector: {
    name: 'templateConfig.chronologyRules[0].ruleFormat.monthDayFormat.value',
  },
  selectorName: 'Month day format*',
  optionsArray: ['3', '3rd', ''],
};
const monthSelector = {
  selector: {
    name: 'templateConfig.chronologyRules[0].ruleFormat.monthFormat.value',
  },
  selectorName: 'Month format*',
  optionsArray: ['October', '10', 'Oct', ''],
};
const yearSelector = {
  selector: { name: 'templateConfig.chronologyRules[0].ruleFormat.yearFormat.value' },
  selectorName: 'Year format*',
  optionsArray: ['2023', '23', ''],
};

describe('ChronologyField', () => {
  // TODO These values need to be moved over to using the centralised resources
  // Should be using the getRulesetFormValues utils to change the ruleset from persistent values in centralised resources
  // into form values as this is what happens to the values that are passed from the forms route level
  //
  // Besides that this is passing down a title for description purposes along with the props that would be set within the ChronologyFieldArray
  // It additionally passes down the fields which will be renders based on the templateMetadataRuleFormat
  describe.each([
    {
      title: 'chronology_date',
      componentProps: {
        chronologyRule: {
          ruleLocale: 'en',
          templateMetadataRuleFormat: 'chronology_date',
        },
      },
      fields: [weekdaySelector, monthDaySelector, monthSelector, yearSelector],
    },
    {
      title: 'chronology_month',
      componentProps: {
        chronologyRule: {
          ruleLocale: 'en',
          templateMetadataRuleFormat: 'chronology_month',
        },
      },
      fields: [monthSelector, yearSelector],
    },
    {
      title: 'chronology_year',
      componentProps: {
        chronologyRule: {
          ruleLocale: 'en',
          templateMetadataRuleFormat: 'chronology_year',
        },
      },
      fields: [yearSelector],
    },
  ])('with $title templateMetadataRuleFormat', ({ componentProps, fields }) => {
    // Renders the component with the above component props
    beforeEach(() => {
      renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <ChronologyField
            index={0}
            name="templateConfig.chronologyRules[0].ruleFormat"
            {...componentProps}
          />
        </TestForm>,
        translationsProperties
      );
    });

    // Checks that all of the fields are rendered
    test.each(fields)(
      'renders Select component with label $selectorName ',
      (field) => {
        Select(field.selectorName).exists();
      }
    );

    // Then tests each field and all options and checks that the correct option is selected
    // NOTE This is not in version 2.2.1 of stripes-erm-testing so cannot be back ported
    describe.each(fields)('$selectorName select', (field) => {
      testSelect(field);
    });
  });
});
