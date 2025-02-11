import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Select,
  TextField,
  Button,
} from '@folio/stripes-erm-testing';

import CombinationField from './CombinationField';

import { translationsProperties } from '../../../../../test/helpers';
import { refdata as mockRefdata } from '../../../../../test/resources';

const combination = {
  timeUnit: {
    value: 'issue',
  },
  patternType: 'issue_week',
  pattern: {
    issue: '1',
    week: '1',
  },
  issuesToCombine: '3',
};

jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const onSubmit = jest.fn();

let renderComponent;
describe('CombinationField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <CombinationField
          combination={combination}
          index={1}
          name="combination.rules"
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('First issue')).toBeInTheDocument();
  });

  it('renders expected selection title', async () => {
    await Select('Combination rule type*').exists();
  });

  it('renders expected rule with selected option', async () => {
    Select('Combination rule type*').choose('Issue (1-n)');
  });

  it('renders expected rule with selected option', async () => {
    Select('Combination rule type*').choose('Issue(1 - n), Week(1 - 53)');
  });

  it('renders expected rule with selected option', async () => {
    Select('Combination rule type*').choose(
      'Issue(1 - n), Week(1 - 5), Month(Jan - Dec)'
    );
  });

  it('renders expected rule with selected option', async () => {
    Select('Combination rule type*').choose('Issue(1 - n), Month(Jan - Dec)');
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('First issue')).toBeInTheDocument();
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Issue')).toBeInTheDocument();
  });

  test('renders the expected column text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Total number of issues to combine')).toBeInTheDocument();
  });

  test('renders the Lable TextField', async () => {
    await TextField({ id: 'total-number-of-issues-to-combine' }).exists();
  });

  test('renders the Combination rule type dropdown with correct options', async () => {
    await Select('Combination rule type*').exists();
    await waitFor(async () => {
      await Select('Combination rule type*').choose('Issue (1-n)');
      await Select('Combination rule type*').choose('Issue (1-n), Week (1-52)');
      await Select('Combination rule type*').choose(
        'Issue (1-n), Week (1-4), Month (Jan-Dec)'
      );
      await Select('Combination rule type*').choose(
        'Issue (1-n), Month (Jan-Dec)'
      );
    });
  });

  test('renders the In week dropdown with correct options', async () => {
    await Select('In week*').exists();
    await waitFor(async () => {
      await Select('In week*').choose('1');
      await Select('In week*').choose('2');
      await Select('In week*').choose('3');
      await Select('In week*').choose('4');
      await Select('In week*').choose('5');
      await Select('In week*').choose('6');
      await Select('In week*').choose('7');
      await Select('In week*').choose('8');
      await Select('In week*').choose('9');
      await Select('In week*').choose('10');
      await Select('In week*').choose('11');
      await Select('In week*').choose('12');
      await Select('In week*').choose('13');
      await Select('In week*').choose('14');
      await Select('In week*').choose('15');
      await Select('In week*').choose('16');
      await Select('In week*').choose('17');
      await Select('In week*').choose('18');
      await Select('In week*').choose('19');
      await Select('In week*').choose('20');
    });
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
