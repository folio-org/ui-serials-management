import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
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
const initialValues = {
  serialStatus: {
    value: 'active',
  },
};

let renderComponent;

const onSubmit = jest.fn();
describe('SerialCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm initialValues={initialValues} onSubmit={onSubmit}>
          <SerialCreateRoute initialValues={initialValues} />
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
