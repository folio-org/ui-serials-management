import {
  renderWithIntl,
  TestForm,
  Select,
  TextArea,
} from '@folio/stripes-erm-testing';

import SerialInfoForm from './SerialInfoForm';

import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

let renderComponent;
describe('SerialInfoForm', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <SerialInfoForm />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected description label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Description')).toBeInTheDocument();
  });

  test('Displays expected description value', async () => {
    await TextArea({ id: 'serials-description' }).has({
      value: '',
    });
  });

  it('renders expected selection title', async () => {
    await Select('Status*').exists();
  });
});
