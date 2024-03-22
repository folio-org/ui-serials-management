import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import POLineForm from './POLineForm';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('../../SerialPOLineInfo', () => () => <div>SerialPOLineInfo</div>);
jest.mock('../POLineLookup', () => () => <div>POLineLookup</div>);

const onSubmit = jest.fn();
describe('POLineForm', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <POLineForm />
        </TestForm>
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the POLineLookup component', async () => {
    const { getByText } = renderComponent;
    expect(getByText('POLineLookup')).toBeInTheDocument();
  });
});

