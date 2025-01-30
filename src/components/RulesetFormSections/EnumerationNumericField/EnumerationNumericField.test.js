import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Select,
  TextField,
  Button,
} from '@folio/stripes-erm-testing';

import EnumerationNumericField from './EnumerationNumericField';

import { translationsProperties } from '../../../../test/helpers';
import mockRefdata from '../../../../test/resources/refdata';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

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
          name="templateConfig.enumerationRules[0].ruleFormat.levels[0]"
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

  test('renders the Format dropdown with correct options', async () => {
    await Select('Format*').exists();
    await waitFor(async () => {
      await Select('Format*').choose('Number (1, 2, 3)');
      await Select('Format*').choose('Ordinal (1st, 2nd, 3rd)');
      await Select('Format*').choose('Roman numerals (I, II, III)');
    });
  });

  test('renders the Sequence dropdown with correct options', async () => {
    await Select('Sequence*').exists();
    await waitFor(async () => {
      await Select('Sequence*').choose('Continuous');
      await Select('Sequence*').choose('Reset');
    });
  });
  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
