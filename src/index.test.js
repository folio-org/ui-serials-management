import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../test/helpers';
import App from './index';

jest.mock('./settings', () => () => <div>Settings</div>);
jest.mock('@folio/stripes/components', () => {
  const StripesComponents = jest.requireActual('@folio/stripes/components');

  return ({
    ...StripesComponents,
    KeyboardShortcutsModal: () => <div>KeyboardShortcutsModal</div>
  });
});

jest.mock('@folio/stripes-core', () => {
  const { mockStripesCore } = jest.requireActual('@folio/stripes-erm-testing');

  return ({
    ...jest.requireActual('@folio/stripes-core'),
    ...mockStripesCore,
    AppContextMenu: ({ children }) => (<>{children}</>)
  });
});


let renderComponent;
describe('App', () => {
  describe('Settings render', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter initialEntries={['/app']}>
          <App actAs="settings" match={{ path: 'app' }} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders settings component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Settings')).toBeInTheDocument();
    });
  });

  // Not working right now
  /* describe('App render', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter initialEntries={['/app']}>
          <App actAs="app" match={{ path: 'app' }} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('does not render settings component', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('SettingsComponent')).not.toBeInTheDocument();
    });

    describe('Shortcuts menu', () => {
      it('does not render keyboard shortcuts component', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('KeyboardShortcutsModal')).not.toBeInTheDocument();
      });

      describe('opening shortcut menu', () => {
        beforeEach(async () => {
          await NavListItem({ id: 'keyboard-shortcuts-item' }).click();
        });

        it('renders keyboard shortcuts component', () => {
          const { getByText } = renderComponent;
          expect(getByText('KeyboardShortcutsModal')).toBeInTheDocument();
        });
      });
    });
  }); */
});
