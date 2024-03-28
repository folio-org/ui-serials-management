import { MemoryRouter } from 'react-router-dom';

import {
  Accordion,
  renderWithIntl,
  Badge,
  MultiColumnList,
} from '@folio/stripes-erm-testing';

import SerialPieceSets from './SerialPieceSets';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSets } from '../../../../test/resources';

let renderComponent;
describe('SerialPieceSets', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialPieceSets
          id="serial-section-serial-piece-sets"
          pieceSets={pieceSets}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Predicted piece sets Accordion heading', async () => {
    await Accordion('Predicted piece sets').exists();
  });

  test('renders the expected badge number', async () => {
    await Badge('1').exists();
  });

  test('renders expected MCL by ID', async () => {
    await MultiColumnList('serial-pieces-sets').exists();
  });

  test('renders expected column headers', async () => {
    await MultiColumnList({
      columns: ['Date generated', 'Start date', 'Pattern ID', 'Total', 'Note'],
    }).exists();
  });

  test('renders a gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: '3/19/2024' })).toBeInTheDocument();
  });

  test('renders a gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: '4' })).toBeInTheDocument();
  });

  test('renders a gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: 'test' })).toBeInTheDocument();
  });

  test('renders end of list text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('End of list')).toBeInTheDocument();
  });
});
