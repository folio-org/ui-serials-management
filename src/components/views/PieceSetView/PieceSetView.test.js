import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import { handlers, resource } from '../../../../test/resources';
import PieceSetView from './PieceSetView';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: () => jest.fn(),
}));

jest.mock('../../PieceSetSections/PieceSetInfo', () => () => (
  <div>PieceSetInfo</div>
));

jest.mock('../../PieceSetSections/PiecesList', () => () => <div>PiecesList</div>);

jest.mock('../../GenerateReceivingModal/GenerateReceivingModal', () => () => (
  <div>GenerateReceivingModal</div>
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

    test('Action menu has one items', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Generate receiving pieces').has({ disabled: true });
      });
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
