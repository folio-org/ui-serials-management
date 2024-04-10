import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import SerialEditRoute from './SerialEditRoute';

import { translationsProperties } from '../../../test/helpers';

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
