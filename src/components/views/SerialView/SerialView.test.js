import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import SerialView from './SerialView';
import { handlers, serial } from '../../../../test/resources';

jest.mock('../../SerialSections/SerialInfo', () => () => <div>SerialInfo</div>);
jest.mock('../../SerialSections/SerialPOLine', () => () => (
  <div>SerialPOLine</div>
));
jest.mock('../../SerialSections/PublicationPattern', () => () => (
  <div>PublicationPattern</div>
));
jest.mock('../../SerialSections/DeprecatedPublicationPatterns', () => () => (
  <div>DeprecatedPublicationPatterns</div>
));
jest.mock('../../SerialSections/SerialNotes', () => () => (
  <div>SerialNotes</div>
));
jest.mock('../../SerialSections/SerialPieceSets', () => () => (
  <div>SerialPieceSets</div>
));
jest.mock('../../PiecesPreviewModal/PiecesPreviewModal', () => () => (
  <div>PiecesPreviewModal</div>
));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingPane: () => <div>LoadingPane</div>,
}));

describe('SerialView', () => {
  let renderComponent;
  describe('with a loading serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialView
            onClose={handlers.onClose}
            queryProps={{ isLoading: true }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders LoadingPane Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LoadingPane')).toBeInTheDocument();
    });
  });

  describe('with a serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            resource={serial}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders SerialInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Title - Interesting Times')).toBeInTheDocument();
    });

    test('renders SerialInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PO line - 52590-1')).toBeInTheDocument();
    });

    test('renders MetaSection Component', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('Record last updated: 2/26/2024 9:58 AM')
      ).toBeInTheDocument();
      expect(
        getByText('Record created: 2/26/2024 9:58 AM')
      ).toBeInTheDocument();
    });

    test('renders SerialInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialInfo')).toBeInTheDocument();
    });

    test('renders SerialPOLine Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialPOLine')).toBeInTheDocument();
    });

    test('renders PublicationPattern Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PublicationPattern')).toBeInTheDocument();
    });

    test('renders SerialNotes Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialNotes')).toBeInTheDocument();
    });

    test('renders DeprecatedPublicationPatterns Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DeprecatedPublicationPatterns')).toBeInTheDocument();
    });
  });
});
