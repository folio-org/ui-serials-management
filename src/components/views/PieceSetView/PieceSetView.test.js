import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import PieceSetView from './PieceSetView';
import { handlers, pieceSet } from '../../../../test/resources';

jest.mock('../../PieceSetSections/PieceSetInfo', () => () => (
  <div>PieceSetInfo</div>
));
jest.mock('../../PieceSetSections/PiecesList', () => () => (
  <div>PiecesList</div>
));

describe('PieceSetView', () => {
  let renderComponent;
  describe('renders components with no piece set', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PieceSetView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders PieceSetInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PieceSetInfo')).toBeInTheDocument();
    });

    test('renders PiecesList Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PiecesList')).toBeInTheDocument();
    });
  });

  describe('renders components with piece set', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PieceSetView
            onClose={handlers.onClose}
            pieceSet={pieceSet}
            queryProps={{ isLoading: false }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders PieceSetInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PieceSetInfo')).toBeInTheDocument();
    });

    test('renders PiecesList Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PiecesList')).toBeInTheDocument();
    });
  });
});
