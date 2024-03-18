import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import SerialCreateRoute from './SerialCreateRoute';

import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/SerialForm', () => () => <div>SerialForm</div>);

const history = {
  length: 14,
  action: 'PUSH',
  location: {
    pathname: '/serials-management/serials/create',
    search: '',
    hash: '',
    key: 'pfrl8e',
  },
  createHref: 'ƒ createHref() {}',
  push: 'ƒ push() {}',
  replace: 'ƒ replace() {}',
  go: 'ƒ go() {}',
  goBack: 'ƒ goBack() {}',
  goForward: 'ƒ goForward() {}',
  block: 'ƒ block() {}',
  listen: 'ƒ listen() {}',
};

const location = {
  pathname: '/serials-management/serials/create',
  search: '',
  hash: '',
  key: 'pfrl8e',
};

const match = {
  path: '/serials-management/serials/create',
  url: '/serials-management/serials/create',
  isExact: true,
  params: '{}',
};

let renderComponent;

describe('SerialCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialCreateRoute history={history} location={location} match={match} />
      </MemoryRouter>,
      translationsProperties
    );
  });
  test('renders the SerialForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SerialForm')).toBeInTheDocument();
  });
});
