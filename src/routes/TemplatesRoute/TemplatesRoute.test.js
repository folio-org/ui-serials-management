import { MemoryRouter, useLocation } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../test/helpers';
import TemplatesRoute from './TemplatesRoute';

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  SASQRoute: () => <div>SASQRoute</div>,
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));

const location = {
  pathname: '/serials-management/templates/da8378f62599cb70cee4601785a350b7',
  search: '?filters=modelRulesetStatus.active',
};

let renderComponent;
describe('TemplatesRoute', () => {
  beforeEach(() => {
    useLocation.mockClear().mockReturnValue(location);
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TemplatesRoute
          location={location}
          path="/serials-management/modelRulesets"
        />,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the SASQRoute component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SASQRoute')).toBeInTheDocument();
  });
});
