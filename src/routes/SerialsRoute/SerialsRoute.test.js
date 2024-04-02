import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter, useLocation } from 'react-router-dom';

import SerialsRoute from './SerialsRoute';

import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/SearchAndFilter/SerialsFilters', () => () => (
  <div>SerialsFilters</div>
));
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
  pathname: '/serials-management/serials/42085e29-aa74-418b-9f47-88d50928f26a',
  search: '?filters=serialStatus.active',
  hash: '',
  key: '1251r1',
};

const computedMatch = {
  path: '/serials-management/serials',
  url: '/serials-management/serials',
  isExact: false,
  params: '{}',
};

let renderComponent;

describe('SerialsRoute', () => {
  beforeEach(() => {
    useLocation.mockClear().mockReturnValue(location);
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialsRoute
          computedMatch={computedMatch}
          location={location}
          path="/serials-management/serials"
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
