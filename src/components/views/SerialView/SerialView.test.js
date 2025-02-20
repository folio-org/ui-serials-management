import { renderWithIntl, Button, Modal } from '@folio/stripes-erm-testing';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
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

    test('renders Serial title', () => {
      const { getByText } = renderComponent;
      expect(getByText('Title - Interesting Times')).toBeInTheDocument();
    });

    test('renders Serial PO line', () => {
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

    test('Action menu has edit button', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Edit').click();
      });
    });

    test('Action menu has delete button', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Delete').click();
      });
    });

    describe('opening actions menu', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });

      describe('clicking delete', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button('Delete').click();
          });
        });

        test('renders the confirmation modal', async () => {
          await waitFor(async () => {
            await Modal('Delete serial').exists();
          });
        });

        describe('cancelling confirmation modal', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Cancel').click(); // close the modal
            });
          });

          test('confirmation modal no longer renders', async () => {
            await waitFor(async () => {
              await Modal('Delete serial').absent();
            });
          });
        });
      });
    });
  });
});
