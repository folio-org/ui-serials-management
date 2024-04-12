import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import SerialEditRoute from './SerialEditRoute';

import { translationsProperties } from '../../../test/helpers';

// Mock useHistory to provide a mock block function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    block: jest.fn(),
  }),
}));

jest.mock('../../components/views/SerialForm', () => () => <div>SerialForm</div>);

const onSubmit = jest.fn();

let renderComponent;

describe('SerialEditRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <SerialEditRoute />,
        </TestForm>
        ,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the SerialForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SerialForm')).toBeInTheDocument();
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
