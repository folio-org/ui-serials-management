import { renderWithIntl, TestForm, Select } from '@folio/stripes-erm-testing';

import OmissionField from './OmissionField';

import { translationsProperties } from '../../../../test/helpers';

const omission = {
  'timeUnit': {
    'value': 'month',
  },
  'patternType': 'month',
  'pattern': {
    'monthFrom': {
      'value': 'january',
    },
    'isRange': true,
    'monthTo': {
      'value': 'december',
    },
  },
};
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

  it('renders expected selection title', async () => {
    await Select('Omission rule type*').exists();
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
});
