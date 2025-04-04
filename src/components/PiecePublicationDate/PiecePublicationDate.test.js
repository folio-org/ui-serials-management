import { renderWithIntl } from '@folio/stripes-erm-testing';
import PiecePublicationDate from './PiecePublicationDate';
import { translationsProperties } from '../../../test/helpers';

import {
  INTERNAL_COMBINATION_PIECE,
  INTERNAL_OMISSION_PIECE,
  INTERNAL_RECURRENCE_PIECE,
} from '../../constants/internalPieceClasses';

import {
  pieceSet,
  omissionPieceSet,
  combinationPieceSet,
} from '../../../test/resources/piecesets';

describe('PiecePublicationDate', () => {
  describe('with an internal recurrence piece ', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PiecePublicationDate
          id="piece-set-section-info"
          piece={pieceSet?.pieces?.find(
            (piece) => piece.class === INTERNAL_RECURRENCE_PIECE
          )}
        />,
        translationsProperties
      );
    });

    test('renders the expected date value', async () => {
      const { getByText } = renderComponent;
      expect(getByText('10/1/2024')).toBeInTheDocument();
    });
  });

  describe('with an internal omission piece', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PiecePublicationDate
          id="piece-set-section-info"
          piece={omissionPieceSet?.pieces?.find(
            (piece) => piece.class === INTERNAL_OMISSION_PIECE
          )}
        />,
        translationsProperties
      );
    });

    test('renders the expected date value', async () => {
      const { getByText } = renderComponent;
      expect(getByText('1/1/2025')).toBeInTheDocument();
    });

    test('renders the Omitted label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Omitted')).toBeInTheDocument();
    });
  });

  describe('with an internal combination piece', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PiecePublicationDate
          id="piece-set-section-info"
          piece={combinationPieceSet?.pieces?.find(
            (piece) => piece.class === INTERNAL_COMBINATION_PIECE
          )}
        />,
        translationsProperties
      );
    });

    // Unsure why we need to desconstruct getByText here, but its needed in order for the test to pass
    test('renders the expected date value', async () => {
      const { getByText } = renderComponent;
      await expect(
        getByText((content) => content.includes('1/1/2025'))
      ).toBeInTheDocument();
    });

    test('renders the combined pieces value', async () => {
      const { getByText } = renderComponent;
      await expect(
        getByText((content) => content.includes('Combined pieces: 2'))
      ).toBeInTheDocument();
    });
  });
});
