import { MemoryRouter } from 'react-router-dom';

import {
  Accordion,
  renderWithIntl,
  Checkbox
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import { refdata as mockRefdata } from '../../../../test/resources';
import RulesetFilters from './RulesetFilters';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata.filter((rdc) => rdc.desc === 'ModelRuleset.ModelRulesetStatus'),
}));

const activeFilters = {
  modelRulesetStatus: ['active'],
};

const stateMock = jest.fn();

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};

describe('RulesetFilters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RulesetFilters
          activeFilters={activeFilters}
          filterHandlers={filterHandlers}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Status accordion', async () => {
    await Accordion('Status').exists();
  });

  test('renders the expected Active label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Active')).toBeInTheDocument();
  });

  test('renders the expected Closed label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Closed')).toBeInTheDocument();
  });

  test('renders Active Checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-modelRulesetStatus-active' }).exists();
  });

  test('renders Closed Checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-modelRulesetStatus-closed' }).exists();
  });

  test('clicking the Ruleset status checkbox', async () => {
    await Checkbox('Active').is({ checked: true });
    await Checkbox('Closed').is({ checked: false });
  });

  test('changing the Ruleset status checkbox calls the state handler', async () => {
    await Checkbox('Closed').click();
    expect(stateMock).toHaveBeenCalled();
  });
});
