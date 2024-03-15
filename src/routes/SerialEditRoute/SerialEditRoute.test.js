import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import SerialEditRoute from './SerialEditRoute';

import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/SerialForm', () => () => <div>SerialForm</div>);

const history = {
  length: 17,
  action: 'PUSH',
  location: {
    pathname: '/serials-management/serials/db9da0f4-ee0c-4b29-93a2-25a0508b4155/edit',
    search: '',
    hash: '',
    key: 'nt1g8k',
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
  pathname: '/serials-management/serials/db9da0f4-ee0c-4b29-93a2-25a0508b4155/edit',
  search: '',
  hash: '',
  key: 'nt1g8k',
};

const match = {
  path: '/serials-management/serials/:id/edit',
  url: '/serials-management/serials/db9da0f4-ee0c-4b29-93a2-25a0508b4155/edit',
  isExact: true,
  params: {
    id: 'db9da0f4-ee0c-4b29-93a2-25a0508b4155',
  },
};

let renderComponent;

describe('SerialEditRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialEditRoute history={history} location={location} match={match} />
      </MemoryRouter>,
      translationsProperties
    );
  });
  test('renders the SerialForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SerialForm')).toBeInTheDocument();
  });
});
