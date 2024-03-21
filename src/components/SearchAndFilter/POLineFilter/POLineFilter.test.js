import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import POLineFilter from './POLineFilter';
import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();
describe('POLineFilter', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <POLineFilter />
        </TestForm>
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected message', async () => {
    const { getByText } = renderComponent;
    expect(getByText('No "find-po-line" plugin is installed')).toBeInTheDocument();
  });
});
