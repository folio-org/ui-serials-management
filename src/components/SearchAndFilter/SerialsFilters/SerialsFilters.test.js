import { Accordion, renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';

import SerialsFilters from './SerialsFilters';

const activeFilters = {
  serialStatus: ['active'],
  orderLine: ['b9cc5473-bb40-1d61-afc0-d3a5ba0ed0a8'],
};

const stateMock = jest.fn();

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};

describe('SerialsFilters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialsFilters activeFilters={activeFilters} filterHandlers={filterHandlers} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Status Accordion', async () => {
    await Accordion('Status').exists();
  });

  test('renders the expected text', () => {
    const { getByText } = renderComponent;
    expect(getByText('No "find-po-line" plugin is installed')).toBeInTheDocument();
  });
});
