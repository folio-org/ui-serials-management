import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../test/helpers';
import TemplatesRoute from './TemplatesRoute';
import urls from '../../components/utils/urls';
import { RulesetFilters } from '../../components/SearchAndFilter';
import { TemplateView } from '../../components/views';
import { MODEL_RULESETS_ENDPOINT } from '../../constants/endpoints';

const mockHistoryPush = jest.fn();
const mockLocation = { search: '?filters=modelRulesetStatus.active' };
let mockSASQRouteProps;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => mockLocation,
}));

jest.mock('@k-int/stripes-kint-components', () => {
  const actual = jest.requireActual('@k-int/stripes-kint-components');

  return {
    ...actual,
    SASQRoute: (props) => {
      mockSASQRouteProps = props;
      const { mainPaneProps } = props;

      return (
        <div>
          <div>SASQRoute</div>
          {mainPaneProps.lastMenu}
        </div>
      );
    },
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
    mockSASQRouteProps = undefined;

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

  test('passes expected props to SASQRoute', () => {
    expect(mockSASQRouteProps).toBeDefined();
    expect(mockSASQRouteProps.id).toBe('templates');
    expect(mockSASQRouteProps.path).toBe('/serials-management/modelRulesets');
    expect(mockSASQRouteProps.FilterComponent).toBe(RulesetFilters);
    expect(mockSASQRouteProps.ViewComponent).toBe(TemplateView);
    expect(mockSASQRouteProps.searchFieldAriaLabel).toBe('templates-search-field');

    expect(mockSASQRouteProps.fetchParameters).toEqual({
      endpoint: MODEL_RULESETS_ENDPOINT,
      SASQ_MAP: {
        searchKey: 'name,description',
        perPage: 50,
        filterKeys: {
          modelRulesetStatus: 'modelRulesetStatus.value',
        },
      },
    });

    expect(mockSASQRouteProps.mclProps.id).toBe('list-templates');

    expect(mockSASQRouteProps.resultColumns.map(col => col.propertyPath)).toEqual([
      'name',
      'modelRulesetStatus',
      'description',
      'exampleLabel',
    ]);

    expect(mockSASQRouteProps.sasqProps).toEqual({
      initialSortState: { sort: 'name', direction: 'ascending' },
      sortableColumns: ['name'],
    });
  });

  test('formatter functions behave as expected', () => {
    const { formatter } = mockSASQRouteProps.mclProps;

    expect(formatter.name({ name: 'Template A' })).toBe('Template A');
    expect(formatter.name({})).toBeUndefined();

    expect(
      formatter.modelRulesetStatus({ modelRulesetStatus: { label: 'Active' } })
    ).toBe('Active');
    expect(formatter.modelRulesetStatus({})).toBeUndefined();

    expect(
      formatter.description({ description: 'Some description' })
    ).toBe('Some description');
    expect(formatter.description({})).toBeUndefined();
  });

  test('clicking New button navigates to template create with current search params', async () => {
    await Button('New').click();

    expect(urls.templateCreate).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(
      '/serials-management/modelRulesets/create?filters=modelRulesetStatus.active'
    );
  });
});
