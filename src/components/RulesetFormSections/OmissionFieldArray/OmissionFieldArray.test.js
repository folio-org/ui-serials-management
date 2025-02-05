import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Button,
  Select,
} from '@folio/stripes-erm-testing';
import OmissionFieldArray from './OmissionFieldArray';

import { translationsProperties } from '../../../../test/helpers';
import { refdata as mockRefdata } from '../../../../test/resources';

jest.mock('../CombinationField', () => () => <div>CombinationField</div>);

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));
const onSubmit = jest.fn();

const data = {
  rulesetStatus: {
    value: 'active',
  },
  omission: {
    rules: [
      {
        timeUnit: {
          value: 'month',
        },
        patternType: 'month',
        pattern: {
          monthFrom: {
            value: 'january',
          },
          isRange: true,
          monthTo: {
            value: 'december',
          },
        },
      },
    ],
  },
  recurrence: {
    timeUnit: {
      value: 'day',
    },
    period: '1',
    issues: '1',
    rules: [{}],
  },
  patternType: 'day',
};

let renderComponent;
describe('OmissionFieldArray', () => {
  describe('With no omission', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={{}} onSubmit={onSubmit}>
          <OmissionFieldArray name="omission.rules" />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected empty omission rule label', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No omission rules for this publication pattern')
      ).toBeInTheDocument();
    });

    test('renders the Add omission rule button', async () => {
      await Button('Add omission rule').exists();
    });

    describe('Adding omission level', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add omission rule').click();
        });
      });

      test('renders one level', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('CombinationField')).not.toBeInTheDocument();
      });
    });
  });
  describe('with omission', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={data} onSubmit={onSubmit}>
          <OmissionFieldArray name="omission.rules" />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected Omission rule 1 label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Omission rule 1')).toBeInTheDocument();
    });

    test('renders the expected Remove omission rule 1label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Remove omission rule 1')).toBeInTheDocument();
    });

    test('renders the time unit dropdown with correct options', async () => {
      await Select('Time unit*').exists();
      await waitFor(async () => {
        await Select('Time unit*').choose('Day');
        await Select('Time unit*').choose('Week');
        await Select('Time unit*').choose('Month');
        await Select('Time unit*').choose('Issue');
      });
    });

    test('renders the Omission rule type dropdown with correct options', async () => {
      await Select('Omission rule type*').exists();
      await waitFor(async () => {
        await Select('Omission rule type*').choose('Month (Jan-Dec)');
      });
    });

    test('renders the Month from dropdown with correct options', async () => {
      await Select('Month from*').exists();
      await waitFor(async () => {
        await Select('Month from*').choose('January');
        await Select('Month from*').choose('February');
        await Select('Month from*').choose('March');
        await Select('Month from*').choose('April');
        await Select('Month from*').choose('May');
        await Select('Month from*').choose('June');
        await Select('Month from*').choose('July');
        await Select('Month from*').choose('August');
        await Select('Month from*').choose('September');
        await Select('Month from*').choose('October');
        await Select('Month from*').choose('November');
        await Select('Month from*').choose('December');
      });
    });

    test('renders the Month to dropdown with correct options', async () => {
      await Select('Month to*').exists();
      await waitFor(async () => {
        await Select('Month to*').choose('January');
        await Select('Month to*').choose('February');
        await Select('Month to*').choose('March');
        await Select('Month to*').choose('April');
        await Select('Month to*').choose('May');
        await Select('Month to*').choose('June');
        await Select('Month to*').choose('July');
        await Select('Month to*').choose('August');
        await Select('Month to*').choose('September');
        await Select('Month to*').choose('October');
        await Select('Month to*').choose('November');
        await Select('Month to*').choose('December');
      });
    });

    test('renders the Add omission rule button', async () => {
      await Button('Add omission rule').exists();
    });

    describe('Adding omission level', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add omission rule').click();
        });
      });

      test('renders one level', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('CombinationField')).not.toBeInTheDocument();
      });
    });
  });
});
