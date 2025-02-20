import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import {
  handlers,
  pieceSet,
  serial as mockSerial,
} from '../../../../test/resources';
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
    useQuery: () => ({ data: mockSerial }),
  };
});

describe('PieceSetView', () => {
  let renderComponent;

  // This can probs be ".each-ified"... there's a lot of repeated tests
  describe('with a loading piece set', () => {
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

  describe('with a piece set', () => {
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

    test('renders pane title text', async () => {
      const { queryByText } = renderComponent;
      expect(queryByText('Quiet times (02/26/2024)')).not.toBeInTheDocument();
    });

    test.each([
      { componentName: 'PieceSetInfo' },
      { componentName: 'PiecesList' },
      { componentName: 'GenerateReceivingModal' },
    ])('renders $componentName component ', async ({ componentName }) => {
      const { getByText } = renderComponent;
      await expect(getByText(componentName)).toBeInTheDocument();
    });

    describe('clicking action menu', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });

      test('renders disabled generate receiving pieces button', async () => {
        await Button('Generate receiving pieces').has({ disabled: false });
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
