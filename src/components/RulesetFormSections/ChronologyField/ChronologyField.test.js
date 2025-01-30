import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Select,
  Button,
} from '@folio/stripes-erm-testing';

import ChronologyField from './ChronologyField';

import { translationsProperties } from '../../../../test/helpers';
import mockRefdata from '../../../../test/resources/refdata';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const onSubmit = jest.fn();

let renderComponent;

describe('ChronologyField', () => {
  // TODO This needs to be moved over to using the centralised resources
  // USE DocumentFilterRule: // EXAMPLE testing select options with a centralised testSelect method
  describe.each([
    {
      title: 'chronology_date',
      componentProps: {
        chronologyRule: {
          ruleLocale: 'en',
          templateMetadataRuleFormat: 'chronology_date',
        },
      },
      fields: [
        'Weekday format*',
        'Month day format*',
        'Month format*',
        'Year format*',
      ],
    },
    {
      title: 'chronology_month',
      componentProps: {
        chronologyRule: {
          ruleLocale: 'en',
          templateMetadataRuleFormat: 'chronology_month',
        },
      },
      fields: ['Month format*', 'Year format*'],
    },
    {
      title: 'chronology_year',
      componentProps: {
        chronologyRule: {
          ruleLocale: 'en',
          templateMetadataRuleFormat: 'chronology_year',
        },
      },
      fields: ['Year format*'],
    },
  ])(
    'with $title templateMetadataRuleFormat',
    ({ componentProps, fields }) => {
      beforeEach(() => {
        renderComponent = renderWithIntl(
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

      test.each(
        fields.map((e) => {
          return { label: e };
        })
      )('renders Select component with label $label ', async (label) => {
        await Select(label).exists();
      });
    }
  );

  // test('renders the expected template tokens label', async () => {
  //   const { getByText } = renderComponent;
  //   expect(getByText('Template tokens')).toBeInTheDocument();
  // });

  // test('renders the expected template tokens', async () => {
  //   const { getByText } = renderComponent;
  //   expect(
  //     getByText(
  //       '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}'
  //     )
  //   ).toBeInTheDocument();
  // });

  // test('renders the Weekday format dropdown with correct options', async () => {
  //   await Select('Weekday format*').exists();
  //   await waitFor(async () => {
  //     await Select('Weekday format*').choose('Monday');
  //     await Select('Weekday format*').choose('MONDAY');
  //     await Select('Weekday format*').choose('Mon');
  //     await Select('Weekday format*').choose('MON');
  //   });
  // });

  // test('renders the Month day format dropdown with correct options', async () => {
  //   await Select('Month day format*').exists();
  //   await waitFor(async () => {
  //     await Select('Month day format*').choose('3');
  //     await Select('Month day format*').choose('3rd');
  //   });
  // });

  // test('renders the Month format dropdown with correct options', async () => {
  //   await Select('Month format*').exists();
  //   await waitFor(async () => {
  //     await Select('Month format*').choose('October');
  //     await Select('Month format*').choose('10');
  //     await Select('Month format*').choose('Oct');
  //   });
  // });

  // test('renders the Year format dropdown with correct options', async () => {
  //   await Select('Year format*').exists();
  //   await waitFor(async () => {
  //     await Select('Year format*').choose('2023');
  //     await Select('Year format*').choose('23');
  //   });
  // });

  // test('renders the submit button', async () => {
  //   await Button('Submit').exists();
  // });
});
