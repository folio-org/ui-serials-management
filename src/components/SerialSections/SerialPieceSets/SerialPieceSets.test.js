import { MemoryRouter } from 'react-router-dom';

import {
  Accordion,
  renderWithIntl,
  Badge,
  MultiColumnList,
} from '@folio/stripes-erm-testing';

import SerialPieceSets from './SerialPieceSets';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet } from '../../../../test/resources';

let renderComponent;
describe('SerialPieceSets', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialPieceSets
          id="serial-section-serial-piece-sets"
          pieceSets={[pieceSet]}
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

  test('renders a "Date generated" column gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: '2/26/2024 10:02 AM' })).toBeInTheDocument();
  });

  test('renders a "Start date" column gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: '2/1/2024' })).toBeInTheDocument();
  });

  test('renders a "Total" column gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: '12' })).toBeInTheDocument();
  });

  test('renders a "Note" column gridcell with the expected name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('gridcell', { name: 'Test note' })).toBeInTheDocument();
  });

  test('renders end of list text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('End of list')).toBeInTheDocument();
  });
});
