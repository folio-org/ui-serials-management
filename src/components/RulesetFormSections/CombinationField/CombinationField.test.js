import {
  renderWithIntl,
  TestForm,
  Select,
  TextField,
} from '@folio/stripes-erm-testing';

import CombinationField from './CombinationField';

import { translationsProperties } from '../../../../test/helpers';

const combination = {
  'timeUnit': {
    'value': 'issue',
  },
  'patternType': 'issue_week',
  'pattern': {
    'issue': '1',
    'week': '1',
  },
  'issuesToCombine': '3',
};

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
});
