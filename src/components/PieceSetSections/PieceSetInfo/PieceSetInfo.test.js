
import { renderWithIntl, FormattedDateTime, KeyValue } from '@folio/stripes-erm-testing';

import PieceSetInfo from './PieceSetInfo';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet } from '../../../../test/resources';

describe('PieceSetInfo', () => {
  beforeEach(() => {
    renderWithIntl(
      <PieceSetInfo
        id="piece-set-section-info"
        pieceSet={pieceSet}
      />, translationsProperties
    );
  });

  test('renders the expcected date generated date and time', async () => {
    await FormattedDateTime({ id: 'piece=sets-date-generated' }).has({ date: '2/26/2024' });
    await FormattedDateTime({ id: 'piece=sets-date-generated' }).has({ time: '9:58 AM' });
  });

  test('renders the expected Start date value', async () => {
    await KeyValue('Start date').has({ value: '3/11/2024' });
  });

  test('renders the expected total pieces', async () => {
    await KeyValue('Total pieces').has({ value: 'No value set-' });
  });

  test('renders the expected pattern ID', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected Note', async () => {
    await KeyValue('Note').has({ value: 'No value set-' });
  });
});
