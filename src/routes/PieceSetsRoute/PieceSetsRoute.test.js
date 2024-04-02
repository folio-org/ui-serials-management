import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import PieceSetsRoute from './PieceSetsRoute';

import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/SearchAndFilter', () => () => <div>RouteSwitcher</div>);
jest.mock('../../components/views', () => () => <div>PieceSetView</div>);
jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  SASQRoute: () => <div>SASQRoute</div>,
}));

const location = {
  pathname: '/serials-management/pieceSets',
  search: '',
  hash: '',
  key: '3uzy81',
};

const computedMatch = {
  path: '/serials-management/pieceSets',
  url: '/serials-management/pieceSets',
  isExact: true,
  params: '{}',
};

let renderComponent;

describe('PieceSetsRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <PieceSetsRoute
          computedMatch={computedMatch}
          location={location}
          path="/serials-management/pieceSets"
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the SASQRoute component', async () => {
    const { getByText } = renderComponent;
    expect(getByText('SASQRoute')).toBeInTheDocument();
  });
});
