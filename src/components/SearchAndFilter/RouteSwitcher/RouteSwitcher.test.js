import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import RouteSwitcher from './RouteSwitcher';

import { translationsProperties } from '../../../../test/helpers';

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  ResponsiveButtonGroup: () => <div>ResponsiveButtonGroup</div>,
}));

let renderComponent;

describe('RouteSwitcher', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RouteSwitcher primary="serials" />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the ResponsiveButtonGroup component', async () => {
    const { getByText } = renderComponent;
    expect(getByText('ResponsiveButtonGroup')).toBeInTheDocument();
  });
});
