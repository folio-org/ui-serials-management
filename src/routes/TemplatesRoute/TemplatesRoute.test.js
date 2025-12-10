import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../test/helpers';
import TemplatesRoute from './TemplatesRoute';
import urls from '../../components/utils/urls';

const mockHistoryPush = jest.fn();
const mockLocation = { search: '?filters=modelRulesetStatus.active' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => mockLocation,
}));

jest.mock('@k-int/stripes-kint-components', () => {
  const actual = jest.requireActual('@k-int/stripes-kint-components');

  return {
    ...actual,
    SASQRoute: ({ mainPaneProps }) => (
      <div>
        <div>SASQRoute</div>
        {mainPaneProps.lastMenu}
      </div>
    ),
  };
});

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes-core'),
  IfPermission: ({ children }) => <>{children}</>,
}));

jest.mock('../../components/utils/urls', () => ({
  __esModule: true,
  default: {
    templateCreate: jest.fn(() => '/serials-management/modelRulesets/create'),
  },
}));

let renderComponent;

describe('TemplatesRoute', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
    urls.templateCreate.mockClear();

    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TemplatesRoute path="/serials-management/modelRulesets" />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the SASQRoute component', () => {
    const { getByText } = renderComponent;
    expect(getByText('SASQRoute')).toBeInTheDocument();
  });

  test('clicking New button navigates to template create with current search params', async () => {
    await Button('New').click();

    expect(urls.templateCreate).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/serials-management/modelRulesets/create?filters=modelRulesetStatus.active'
    );
  });
});
