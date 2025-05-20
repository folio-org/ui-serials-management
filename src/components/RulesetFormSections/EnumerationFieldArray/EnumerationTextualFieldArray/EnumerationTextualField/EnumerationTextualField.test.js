import { renderWithIntl, TestForm, Select } from '@folio/stripes-erm-testing';

import EnumerationTextualField from './EnumerationTextualField';

import { translationsProperties } from '../../../../../../test/helpers';

const onSubmit = jest.fn();
const onDeleteField = jest.fn();

const dataOptions = [
  {
    'label': 'April',
    'value': 'April',
  },
  {
    'label': 'August',
    'value': 'August',
  },
  {
    'label': 'December',
    'value': 'December',
  },
  {
    'label': 'February',
    'value': 'February',
  },
  {
    'label': 'January',
    'value': 'January',
  },
  {
    'label': 'July',
    'value': 'July',
  },
  {
    'label': 'June',
    'value': 'June',
  },
  {
    'label': 'March',
    'value': 'March',
  },
  {
    'label': 'May',
    'value': 'May',
  },
  {
    'label': 'November',
    'value': 'November',
  },
  {
    'label': 'October',
    'value': 'October',
  },
  {
    'label': 'September',
    'value': 'September',
  },
];

const items = [
  {
    'units': '1',
    'value': 'April',
    'internalNote': 'test',
  },
];

const level = {
  'units': '1',
  'value': 'April',
  'internalNote': 'test',
};

let renderComponent;
describe('EnumerationTextualField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <EnumerationTextualField
          dataOptions={dataOptions}
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

  test('renders the expected number of issues', async () => {
    const { getByText } = renderComponent;
    expect(getByText('1')).toBeInTheDocument();
  });

  it('renders expected format selection', async () => {
    await Select({ id: 'label-text-select-0' }).exists();
  });
});
