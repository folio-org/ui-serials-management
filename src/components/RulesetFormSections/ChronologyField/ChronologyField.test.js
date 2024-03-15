import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import ChronologyField from './ChronologyField';

import { translationsProperties } from '../../../../test/helpers';

const name = 'templateConfig.rules[0].ruleType.ruleFormat';
const templateConfig = {
  'templateMetadataRuleType': 'chronology',
  'ruleType': {
    'templateMetadataRuleFormat': 'chronology_date',
    'ruleFormat': {
      'weekdayFormat': {
        'value': 'full_lower',
      },
      'monthDayFormat': {
        'value': 'number',
      },
      'monthFormat': {
        'value': 'full',
      },
      'yearFormat': {
        'value': 'full',
      },
    },
  },
};
const onSubmit = jest.fn();

let renderComponent;
describe('ChronologyField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <ChronologyField name={name} templateConfig={templateConfig} />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Weekday format')).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Month day format')).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Month format')).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Year format')).toBeInTheDocument();
  });
});
