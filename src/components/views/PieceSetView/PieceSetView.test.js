import { waitFor, screen } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import { handlers, resource } from '../../../../test/resources';
import PieceSetView from './PieceSetView';

jest.mock('../../PieceSetSections/PieceSetInfo', () => () => (
  <div>PieceSetInfo</div>
));

jest.mock('../../PieceSetSections/PiecesList', () => () => <div>PiecesList</div>);

jest.mock('../../GenerateReceivingModal/GenerateReceivingModal', () => () => (
  <div>GenerateReceivingModal</div>
));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingPane: () => <div>LoadingPane</div>,
}));

describe('PieceSetView', () => {
  let renderComponent;
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
            resource={resource}
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

    describe('renders action menu buttons', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      })
      
      test('renders the Action menu with two items', async () => {
        await Button('Generate receiving pieces').has({ disabled: true });
        await Button('Delete predicted piece set').has({ disabled: false });
      });
    })

    describe('renders the confirmation modal ', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
          await Button('Delete predicted piece set').has({ disabled: false })
          await Button('Delete predicted piece set').click()
        });
      })

      test('renders the ConfirmationModal component ', async () => {
        const { getByText } = renderComponent;
        expect(getByText('Delete')).toBeInTheDocument();
      });

      test('closing the ConfirmationModal component ', async () => {
        const { getByText } = renderComponent;
        await Button('Cancel').click()
        await expect(getByText('Actions')).toBeVisible();
      });
    })
  });
});
