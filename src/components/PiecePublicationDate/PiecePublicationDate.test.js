import { renderWithIntl } from '@folio/stripes-erm-testing';

import PiecePublicationDate from './PiecePublicationDate';
import { translationsProperties } from '../../../test/helpers';

const recurrencePiece = {
  piece: {
    id: '582683dd-e971-44e6-bb4e-45b07fb06291',
    date: '2024-04-01',
    owner: {
      id: '10e19919-dd8e-4a18-8846-14824100d853',
    },
    templateString: 'Volume: {{enumeration1.level1}} {{enumeration1.level2}}',
    recurrenceRule: {
      id: '7255a1d0-e7c3-4f9b-bd65-f3b28476ee88',
    },
    receivingPieces: '[]',
    label: 'Volume: 25 1',
    rowIndex: 0,
  },
};

const omissionPiece = {
  id: 'e549636a-af5f-4249-88dc-f2d33e759d8c',
  omissionOrigins: '[]',
  owner: {
    id: '5e63a7aa-953d-4f31-9eee-5b2782ca7b5c',
  },
  templateString: 'test',
  label: 'test',
  rowIndex: 0,
};
// FIXME This needs to be fixed, dates arenot currently working
describe('PiecePublicationDate', () => {
  describe('PiecePublicationDate with recurrence pieces ', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PiecePublicationDate id="piece-set-section-info" piece={recurrencePiece} />,
        translationsProperties
      );
    });

    test('renders the expected date value', async () => {
      const { getByText } = renderComponent;
      expect(getByText('4/15/2024')).toBeInTheDocument();
    });
  });

  describe('PiecePublicationDate with omission origins', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PiecePublicationDate id="piece-set-section-info" piece={omissionPiece} />,
        translationsProperties
      );
    });

    test('renders the expected date value', async () => {
      const { getByText } = renderComponent;
      expect(getByText('4/15/2024')).toBeInTheDocument();
    });

    test('renders the Omitted', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Omitted')).toBeInTheDocument();
    });
  });
});
