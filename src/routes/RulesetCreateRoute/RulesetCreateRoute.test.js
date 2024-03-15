import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import RulesetCreateRoute from './RulesetCreateRoute';

import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/RulesetForm', () => () => <div>RulesetForm</div>);

const history = {
  length: 12,
  action: 'POP',
  location: {
    pathname:
      '/serials-management/serials/db9da0f4-ee0c-4b29-93a2-25a0508b4155/rulesets/create',
    search: '',
    hash: '',
    key: 'ca402w',
  },
  createHref: () => {},
  push: () => {},
  replace: () => {},
  go: () => {},
  goBack: () => {},
  goForward: () => {},
  block: () => {},
  listen: () => {},
};

const location = {
  pathname:
    '/serials-management/serials/db9da0f4-ee0c-4b29-93a2-25a0508b4155/rulesets/create',
  search: '',
  hash: '',
  key: 'ca402w',
};

const match = {
  path: '/serials-management/serials/:id/rulesets/create',
  url: '/serials-management/serials/db9da0f4-ee0c-4b29-93a2-25a0508b4155/rulesets/create',
  isExact: true,
  params: {
    id: 'db9da0f4-ee0c-4b29-93a2-25a0508b4155',
  },
};

let renderComponent;

describe('RulesetCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RulesetCreateRoute history={history} location={location} match={match} />
      </MemoryRouter>,
      translationsProperties
    );
  });
  test('renders the RulesetForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('RulesetForm')).toBeInTheDocument();
  });
});
