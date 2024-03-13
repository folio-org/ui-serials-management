import {
  renderWithIntl,
  TestForm,
  Select,
  TextField,
} from '@folio/stripes-erm-testing';

import EnumerationNumericField from './EnumerationNumericField';

import { translationsProperties } from '../../../../test/helpers';

const items = [
  {
    'units': '1',
    'format': {
      'value': 'number',
    },
    'sequence': {
      'value': 'continuous',
    },
    'internalNote': 'test',
  },
];

const level = {
  'units': '1',
  'format': {
    'value': 'number',
  },
  'sequence': {
    'value': 'continuous',
  },
  'internalNote': 'test',
};

const onSubmit = jest.fn();
const onDeleteField = jest.fn();

let renderComponent;
describe('EnumerationNumericField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <EnumerationNumericField
          index={0}
          items={items}
          level={level}
          name="templateConfig.rules[0].ruleType.ruleFormat.levels[0]"
          onDeleteField={onDeleteField}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected number of units', async () => {
    const { getByText } = renderComponent;
    expect(getByText('1')).toBeInTheDocument();
  });

  it('renders expected format selection', async () => {
    await Select({ id: 'format-value-select' }).exists();
  });

  it('renders expected sequence selection', async () => {
    await Select({ id: 'sequence-value-select' }).exists();
  });

  test('renders the Lable TextField', async () => {
    await TextField({ id: 'internal-note' }).exists();
  });
});
