import { MemoryRouter } from 'react-router-dom';
import {
  renderWithIntl,
  FormattedDateTime,
  KeyValue,
} from '@folio/stripes-erm-testing';

import PieceSetInfo from './PieceSetInfo';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet } from '../../../../test/resources';

let renderComponent;
describe('PieceSetInfo', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <PieceSetInfo id="piece-set-section-info" pieceSet={pieceSet} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders all links with the title', async () => {
    const { getAllByRole } = renderComponent;
    const links = getAllByRole('link', { name: 'Quiet times' });
    expect(links.length).toBeGreaterThan(0);
    links.forEach(link => {
      expect(link).toBeInTheDocument();
    });
  });

  test('renders the expected Serial', async () => {
    await KeyValue('Serial').has({ value: 'Quiet times' });
  });

  test('renders the expcected date generated date and time', async () => {
    await FormattedDateTime({ id: 'piece=sets-date-generated' }).has({
      date: '2/26/2024',
    });
    await FormattedDateTime({ id: 'piece=sets-date-generated' }).has({
      time: '10:02 AM',
    });
  });

  test('renders the expected Start date value', async () => {
    await KeyValue('Start date').has({ value: '2/1/2024' });
  });

  test('renders the expected total pieces', async () => {
    await KeyValue('Total pieces').has({ value: '12' });
  });

  test('renders the expected pattern ID', async () => {
    await KeyValue('Pattern ID').has({ value: 'Test Pattern ID' });
  });

  test('renders the expected Note', async () => {
    await KeyValue('Note').has({ value: 'Test note' });
  });

  test('renders the expected Title in Receiving', async () => {
    await KeyValue('Title in Receiving').has({ value: 'Quiet times' });
  });
});
