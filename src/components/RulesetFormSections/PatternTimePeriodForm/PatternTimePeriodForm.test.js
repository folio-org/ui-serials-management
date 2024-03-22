import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import {
  renderWithIntl,
  TestForm,
  TextField,
  Select,
  Button,
} from '@folio/stripes-erm-testing';

import PatternTimePeriodForm from './PatternTimePeriodForm';
import { translationsProperties } from '../../../../test/helpers';

import mockRefdata from '../../../../test/resources/refdata';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const weeksProp = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'week',
    },
    period: '2',
    issues: '-1',
  },
  patternType: 'week',
};

const monthsProp = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'month',
    },
    period: '2',
    issues: '-1',
  },
  patternType: 'month',
};

const dayProps = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'day',
    },
    period: '1',
    issues: '3',
  },
  patternType: 'day',
};

const yearsProp = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'year',
    },
    period: '2',
    issues: '-1',
  },
  patternType: 'year',
};

const onSubmit = jest.fn();
describe('PatternTimePeriodForm', () => {
  describe('PatternTimePeriodForm with selected week', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={weeksProp} onSubmit={onSubmit}>
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

    test('renders the expected Time unit label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Time unit')).toBeInTheDocument();
    });

    test('renders the expected number of weeks label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Number of weeks')).toBeInTheDocument();
    });

    test('renders the expected number of published per cycle label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No. of issues published per cycle')).toBeInTheDocument();
    });

    it('renders expected Time unit selection', async () => {
      await Select('Time unit*').exists();
    });

    it('renders expected time unit with selected option', async () => {
      await waitFor(async () => {
        await Select('Time unit*').choose('Day');
        await Select('Time unit*').choose('Week');
        await Select('Time unit*').choose('Month');
        await Select('Time unit*').choose('Year');
      });
    });

    test('renders the Lable TextField', async () => {
      await TextField({ id: 'number-of-time-unit' }).exists();
    });

    test('renders the Lable TextField', async () => {
      await waitFor(async () => {
        await TextField('Number of weeks*').fillIn('1');
      });
    });

    test('renders the Lable TextField', async () => {
      await TextField({ id: 'number-of-issue-per-cycle' }).exists();
    });

    test('renders the Lable TextField', async () => {
      await waitFor(async () => {
        await TextField('No. of issues published per cycle*').fillIn('1');
      });
    });

    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });
  });

  describe('PatternTimePeriodForm with month selected', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={monthsProp} onSubmit={onSubmit}>
            <PatternTimePeriodForm />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected number of months label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Number of months')).toBeInTheDocument();
    });

    test('renders the Lable TextField', async () => {
      await waitFor(async () => {
        await TextField('Number of months*').fillIn('2');
      });
    });
  });

  describe('PatternTimePeriodForm with day selected', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={dayProps} onSubmit={onSubmit}>
            <PatternTimePeriodForm />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected number of days label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Number of days')).toBeInTheDocument();
    });

    test('renders the Lable TextField', async () => {
      await waitFor(async () => {
        await TextField('Number of days*').fillIn('2');
      });
    });
  });

  describe('PatternTimePeriodForm with year selected', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm initialValues={yearsProp} onSubmit={onSubmit}>
            <PatternTimePeriodForm />
          </TestForm>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected number of years label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Number of years')).toBeInTheDocument();
    });

    test('renders the Lable TextField', async () => {
      await waitFor(async () => {
        await TextField('Number of years*').fillIn('1');
      });
    });

    test('renders the correct heading', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('heading', { name: 'Cycle length' })).toBeInTheDocument();
    });

    test('renders the correct heading', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Time unit' })).toBeInTheDocument();
    });

    // I don't think this is actually testing anything right now...
    test('renders the save and close button', () => {
      const { findAllByText } = renderComponent;
      expect(findAllByText('button', { name: 'info' }));
    });
  });
});
