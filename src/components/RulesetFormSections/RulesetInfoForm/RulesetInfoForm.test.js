import {
  renderWithIntl,
  TestForm,
  TextArea,
  Select,
} from '@folio/stripes-erm-testing';
import RulesetInfoForm from './RulesetInfoForm';

import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

let renderComponent;
describe('RulesetInfoForm', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <RulesetInfoForm />{' '}
      </TestForm>,
      translationsProperties
    );
  });

  it('renders expected selection title', async () => {
    await Select('Status*').exists();
  });

  test('renders description label', async () => {
    await TextArea('Description').exists();
  });

  test('renders the expected description label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Description')).toBeInTheDocument();
  });
});
