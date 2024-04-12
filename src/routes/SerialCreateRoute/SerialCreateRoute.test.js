import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import SerialCreateRoute from './SerialCreateRoute';

import { translationsProperties } from '../../../test/helpers';

// Mock useHistory to provide a mock block function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    block: jest.fn(),
  }),
}));

jest.mock('../../components/views/SerialForm', () => () => <div>SerialForm</div>);

let renderComponent;

describe('SerialCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialCreateRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });
  test('renders the SerialForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SerialForm')).toBeInTheDocument();
  });
});
