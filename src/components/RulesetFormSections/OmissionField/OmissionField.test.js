import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, TestForm, Select } from '@folio/stripes-erm-testing';

import OmissionField from './OmissionField';

import { translationsProperties } from '../../../../test/helpers';
import { refdata as mockRefdata } from '../../../../test/resources';

const omission = {
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
};

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const onSubmit = jest.fn();

let renderComponent;
describe('OmissionField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <OmissionField index={0} name="omission.rules" omission={omission} />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Omission rule type')).toBeInTheDocument();
  });

  it('renders expected rule with selected option', async () => {
    Select('Omission rule type*').choose('Month (Jan-Dec)');
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Month from')).toBeInTheDocument();
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Omit range of months')).toBeInTheDocument();
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Month to')).toBeInTheDocument();
  });

  it('renders expected selection title', async () => {
    await Select('Omission rule type*').exists();
  });

  test('renders the Weekday format dropdown with correct options', async () => {
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
});
