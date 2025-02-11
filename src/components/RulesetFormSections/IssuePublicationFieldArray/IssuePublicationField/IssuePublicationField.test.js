import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  TestForm,
  Button,
  Select,
} from '@folio/stripes-erm-testing';

import { refdata as mockRefdata } from '../../../../../test/resources';

import IssuePublicationField from './IssuePublicationField';
import { translationsProperties } from '../../../../../test/helpers';

const onSubmit = jest.fn();

jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const initialValues = {
  rulesetStatus: {
    value: 'active',
  },
  description: 'test',
  recurrence: {
    timeUnit: {
      value: 'year',
    },
    period: '1',
    issues: '1',
    rules: [
      {
        pattern: {
          weekday: {
            value: 'monday',
          },
          week: '1',
          month: {
            value: 'january',
          },
        },
      },
    ],
  },
  patternType: 'year_month_weekday',
};

describe('IssuePublicationField', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <TestForm initialValues={initialValues} onSubmit={onSubmit}>
          <IssuePublicationField
            index={0}
            name="recurrence.rules"
            patternType="year_date"
          />
        </TestForm>
        ,
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders expected selection title', async () => {
    await Select('Of month*').exists();
  });

  test('renders the Day dropdown with correct options', async () => {
    await Select('Of month*').exists();
    await waitFor(async () => {
      await Select('Of month*').choose('January');
      await Select('Of month*').choose('February');
      await Select('Of month*').choose('March');
      await Select('Of month*').choose('April');
      await Select('Of month*').choose('May');
      await Select('Of month*').choose('June');
      await Select('Of month*').choose('July');
      await Select('Of month*').choose('August');
      await Select('Of month*').choose('September');
      await Select('Of month*').choose('October');
      await Select('Of month*').choose('November');
      await Select('Of month*').choose('December');
    });
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
