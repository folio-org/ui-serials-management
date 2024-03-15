import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import PieceSetsRoute from './PieceSetsRoute';

import { translationsProperties } from '../../../test/helpers';

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  SASQRoute: () => <div>SASQRoute</div>,
}));

const data = {
  path: '/serials-management/pieceSets',
  location: {
    pathname: '/serials-management/pieceSets',
    search: '',
    hash: '',
    key: '3uzy81',
  },
  computedMatch: {
    path: '/serials-management/pieceSets',
    url: '/serials-management/pieceSets',
    isExact: true,
    params: '{}',
  },
};

let renderComponent;

describe('PieceSetsRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <PieceSetsRoute data={data} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the SASQRoute component', async () => {
    const { getByText } = renderComponent;
    expect(getByText('SASQRoute')).toBeInTheDocument();
  });
});
