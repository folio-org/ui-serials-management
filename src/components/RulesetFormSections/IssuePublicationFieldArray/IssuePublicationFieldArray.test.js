import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  TestForm,
  Button,
  Select,
} from '@folio/stripes-erm-testing';

import IssuePublicationFieldArray from './IssuePublicationFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('../IssuePublicationField', () => () => <div>IssuePublicationField</div>);
const onSubmit = jest.fn();

const props = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'week',
    },
    period: '1',
    issues: '1',
    rules: [
      {
        pattern: {
          weekday: {
            value: 'monday',
          },
        },
      },
    ],
  },
  patternType: 'week',
};

const monthsProps = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'month',
    },
    period: '1',
    issues: '3',
    rules: [
      {
        pattern: {
          day: '1',
        },
      },
      {
        pattern: {
          day: '2',
        },
      },
      {
        pattern: {
          day: '3',
        },
      },
    ],
  },
  patternType: 'month_date',
};

const yearProps = {
  rulesetStatus: {
    value: 'active',
  },
  recurrence: {
    timeUnit: {
      value: 'year',
    },
    period: '1',
    issues: '2',
    rules: [
      {
        pattern: {
          weekday: {
            value: 'monday',
          },
          week: '1',
        },
      },
      {
        pattern: {
          weekday: {
            value: 'tuesday',
          },
          week: '2',
        },
      },
    ],
  },
  patternType: 'year_weekday',
};

let renderComponent;
describe('IssuePublicationFieldArray', () => {
  describe('IssuePublicationFieldArray with time unit day', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={props} onSubmit={onSubmit}>
          <IssuePublicationFieldArray name="templateConfig.rules[0].ruleType.ruleFormat.levels[0]" />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Days of publication, per cycle')).toBeInTheDocument();
    });

    test('renders the expected IssuePublicationField component', async () => {
      const { getByText } = renderComponent;
      expect(getByText('IssuePublicationField')).toBeInTheDocument();
    });

    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });
  });

  describe('IssuePublicationFieldArray with time unit months', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={monthsProps} onSubmit={onSubmit}>
          <IssuePublicationFieldArray name="templateConfig.rules[0].ruleType.ruleFormat.levels[0]" />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Days of publication, per cycle')).toBeInTheDocument();
    });

    test('renders the Day format dropdown with correct options', async () => {
      await Select('Day format*').exists();
      await waitFor(async () => {
        await Select('Day format*').choose('Day (1-31)');
        await Select('Day format*').choose('Day (Mon-Sun), Week (1-4)');
      });
    });

    test('renders the expected IssuePublicationField component', async () => {
      const { getAllByText } = renderComponent;
      expect(getAllByText('IssuePublicationField'));
    });

    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });
  });

  describe('IssuePublicationFieldArray with time unit year', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={yearProps} onSubmit={onSubmit}>
          <IssuePublicationFieldArray name="templateConfig.rules[0].ruleType.ruleFormat.levels[0]" />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Days of publication, per cycle')).toBeInTheDocument();
    });

    test('renders the Day format dropdown with correct options', async () => {
      await Select('Day format*').exists();
      await waitFor(async () => {
        await Select('Day format*').choose('Day (1-31), Month (Jan-Dec)');
        await Select('Day format*').choose('Day (Mon-Sun), Week (1-52)');
        await Select('Day format*').choose(
          'Day (Mon-Sun), Week (1-4), Month (Jan-Dec)'
        );
      });
    });

    test('renders the expected IssuePublicationField component', async () => {
      const { getAllByText } = renderComponent;
      expect(getAllByText('IssuePublicationField'));
    });

    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });
  });
});
