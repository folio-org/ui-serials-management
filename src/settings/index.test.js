import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { renderWithIntl } from '@folio/stripes-erm-testing';

import SerialsManagementSettings from './index';
import { translationsProperties } from '../../test/helpers';

jest.mock('./index', () => () => <div>SettingsComponent</div>);

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  useSettings: jest.fn(),
}));

let renderComponent;
describe('SerialsManagementSettings', () => {
  describe('Settings render', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialsManagementSettings
            actAs="settings"
            match={{ path: '/settings/serials-management' }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders SettingsComponent component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SettingsComponent')).toBeInTheDocument();
    });
  });
});
