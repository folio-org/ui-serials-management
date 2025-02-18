import {
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import { handlers, pieceSet } from '../../../../test/resources';
import PieceSetView from './PieceSetView';

jest.mock('../../PieceSetSections/PieceSetInfo', () => () => (
  <div>PieceSetInfo</div>
));

jest.mock('../../PieceSetSections/PiecesList', () => () => (
  <div>PiecesList</div>
));

jest.mock('../../GenerateReceivingModal/GenerateReceivingModal', () => () => (
  <div>GenerateReceivingModal</div>
));

const mockMutateAsync = jest.fn(() => Promise.resolve(true));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingPane: () => <div>LoadingPane</div>,
}));

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return {
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: () => ({ mutateAsync: () => mockMutateAsync() }),
  };
});

describe('PieceSetView', () => {
  let renderComponent;

  // This can probs be ".each-ified"... there's a lot of repeated tests
  describe('renders with a loading piece set', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PieceSetView
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

    test('renders GenerateReceivingModal Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('GenerateReceivingModal')).toBeInTheDocument();
    });
  });

  describe('renders components with piece set', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PieceSetView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            resource={pieceSet}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Action menu', async () => {
      await Button('Actions').exists();
    });

    test('renders PieceSetInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PieceSetInfo')).toBeInTheDocument();
    });

    test('renders PiecesList Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PiecesList')).toBeInTheDocument();
    });

    describe('clicking action menu', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });

      test('renders disabled generate receiving pieces button', async () => {
        await Button('Generate receiving pieces').has({ disabled: true });
      });

      test('renders delete predicted piece set button', async () => {
        await Button('Delete predicted piece set').has({ disabled: false });
      });

      describe('clicking delete predicted piece set button', () => {
        beforeEach(async () => {
          // Ensure fresh mock for each test
          mockMutateAsync.mockClear();
          await waitFor(async () => {
            await Button('Delete predicted piece set').click();
          });
        });

        test('renders the ConfirmationModal component ', async () => {
          const { getByText } = renderComponent;
          await waitFor(() => {
            expect(getByText('Delete')).toBeInTheDocument();
          });
        });

        describe('clicking delete', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Delete').click();
            });
          });

          test('delete callback was called', async () => {
            await waitFor(() => {
              expect(mockMutateAsync).toHaveBeenCalled();
            });
          });

          test('actions button is visible again', async () => {
            const { getByText } = renderComponent;
            await waitFor(() => {
              expect(getByText('Actions')).toBeVisible();
            });
          });
        });

        describe('clicking cancel', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Cancel').click();
            });
          });

          test('delete callback was not called', async () => {
            await waitFor(() => {
              expect(mockMutateAsync).not.toHaveBeenCalled();
            });
          });

          test('actions button is visible again', async () => {
            const { getByText } = renderComponent;
            await waitFor(() => {
              expect(getByText('Actions')).toBeVisible();
            });
          });
        });
      });
    });
  });
});
