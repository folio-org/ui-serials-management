import {
  Accordion,
  renderWithIntl,
  Button,
  Checkbox,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import { refdata as mockRefdata } from '../../../../test/resources';

import SerialsFilters from './SerialsFilters';

jest.mock('../POLineFilter', () => () => <div>POLineFilter</div>);

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata.filter((rdc) => rdc.desc === 'Serial.SerialStatus'),
}));

const activeFilters = {
  serialStatus: ['active'],
  orderLine: ['baec48dd-1594-2712-be8f-de336bc83fcc'],
};

const stateMock = jest.fn();

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};

describe('SerialsFilters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialsFilters
          activeFilters={activeFilters}
          filterHandlers={filterHandlers}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Status Accordion', async () => {
    await Accordion('Status').exists();
  });

  test('renders the expected Active label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Active')).toBeInTheDocument();
  });
  test('renders Active Checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-serialStatus-active' }).exists();
  });
  test('renders the expected Closed label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Closed')).toBeInTheDocument();
  });

  test('renders Closed Checkbox', async () => {
    await Checkbox({ id: 'clickable-filter-serialStatus-closed' }).exists();
  });

  test('clicking the Serial checkbox', async () => {
    await Checkbox('Active').is({ checked: true });
    await Checkbox('Closed').is({ checked: false });
  });

  test('renders the PO line Accordion', async () => {
    await Accordion('PO line').exists();
  });
  test('renders the expected PO line label', () => {
    const { getByText } = renderComponent;
    expect(getByText('PO line')).toBeInTheDocument();
  });

  test('renders the PO line button', async () => {
    await Button('PO line').exists();
  });

  test('renders the expected POLineFilter component', () => {
    const { getByText } = renderComponent;
    expect(getByText('POLineFilter')).toBeInTheDocument();
  });
});
