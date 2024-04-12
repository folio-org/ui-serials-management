import { MemoryRouter } from 'react-router-dom';

import {
  renderWithIntl,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';

import PiecesList from './PiecesList';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet } from '../../../../test/resources';

describe('PiecesList', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <PiecesList id="piece-set-section-pieces-list" pieceSet={pieceSet} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders expected columns', async () => {
    await MultiColumnList({
      columns: [
        'Issue count',
        'Publication date',
        'Display summary',
        'Receiving pieces',
      ],
    }).exists();
  });

  test('renders expected MCL values', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({
        content: '1',
      }),
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({
        content: '2/1/2024',
      }),
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({
        content: '1 1',
      }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({
        content: '2',
      }),
      await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({
        content: '3/1/2024',
      }),
      await MultiColumnListCell({ row: 1, columnIndex: 2 }).has({
        content: '1 2',
      }),
    ]);
  });
});
