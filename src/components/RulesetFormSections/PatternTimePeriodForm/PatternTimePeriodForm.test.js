import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import {
  renderWithIntl,
  TestForm,
  TextField,
  Select,
} from '@folio/stripes-erm-testing';

import PatternTimePeriodForm from './PatternTimePeriodForm';
import { translationsProperties } from '../../../../test/helpers';

import { refdata as mockRefdata, ruleset } from '../../../../test/resources';
import { getRulesetFormValues } from '../../utils';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const onSubmit = jest.fn();
describe('PatternTimePeriodForm', () => {
  describe('with default values', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm onSubmit={onSubmit}>
            <PatternTimePeriodForm />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected Cycle length header', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Cycle length')).toBeInTheDocument();
    });

    test('renders the expected Time unit select', async () => {
      await Select('Time unit*').exists();
    });

    test('renders the expected Number of time units number field with disabled prop', async () => {
      await TextField('Number of time units*').exists();
      await TextField('Number of time units*').has({ disabled: true });
    });

    test('renders the expected Number of issues published per cycle number field with disabled prop', async () => {
      await TextField('No. of issues published per cycle*').exists();
      await TextField('No. of issues published per cycle*').has({
        disabled: true,
      });
    });

    describe.each([
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' },
    ])(
      'clicking the $label option within the Time unit select',
      ({ label, value }) => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Time unit*').choose(label);
          });
        });

        test(`option ${label} is selected in the Time unit select`, async () => {
          await Select('Time unit*').has({ value });
        });

        test('renders the correct heading based on the selected time unit with the field no longer disabed', async () => {
          await TextField(`Number of ${value}s*`).exists();
          await TextField(`Number of ${value}s*`).has({ disabled: false });
        });

        test('renders the No. of issues published per cycle field with the field no longer disabed', async () => {
          await TextField('No. of issues published per cycle*').exists();
          await TextField('No. of issues published per cycle*').has({
            disabled: false,
          });
        });

        describe('filling in the Number of time units field with a valid value', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await TextField(`Number of ${value}s*`).fillIn('1');
            });
          });

          test('fills in the Number of time units field with the correct value', async () => {
            await TextField(`Number of ${value}s*`).has({ value: '1' });
          });
        });

        describe('filling in the No. of issues published per cycle field with a valid value', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await TextField('No. of issues published per cycle*').fillIn('1');
            });
          });

          test('fills in the No. of issues published per cycle field with the correct value', async () => {
            await TextField('No. of issues published per cycle*').has({
              value: '1',
            });
          });
        });

        describe('filling in the Number of time units field with an invalid value', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await TextField(`Number of ${value}s*`).fillIn('100');
            });
          });

          test('fills in the Number of time units field with the correct value', async () => {
            await TextField(`Number of ${value}s*`).has({ value: '100' });
          });

          test('displays an error message for the Number of time units field', async () => {
            await TextField(`Number of ${value}s*`).valid(false);
          });
        });

        describe('filling in the No. of issues published per cycle field with an invalid value', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await TextField('No. of issues published per cycle*').fillIn(
                '100'
              );
            });
          });

          test('fills in the No. of issues published per cycle field with the correct value', async () => {
            await TextField('No. of issues published per cycle*').has({
              value: '100',
            });
          });

          test('displays an error message for the No. of issues published per cycle field', async () => {
            await TextField('No. of issues published per cycle*').valid(false);
          });
        });
      }
    );
  });

  describe('with initial values', () => {
    const rulesetFormValues = getRulesetFormValues(ruleset);
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={rulesetFormValues} onSubmit={onSubmit}>
            <PatternTimePeriodForm />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected Time unit select', async () => {
      await Select('Time unit*').exists();
      await Select('Time unit*').has({ value: 'month' });
    });

    test('renders the expected Number of time units number field with disabled prop', async () => {
      await TextField('Number of months*').exists();
      await TextField('Number of months*').has({ value: '1' });
    });

    test('renders the expected Number of issues published per cycle number field with disabled prop', async () => {
      await TextField('No. of issues published per cycle*').exists();
      await TextField('No. of issues published per cycle*').has({
        value: '1',
      });
    });
  });
});
