import { MemoryRouter } from 'react-router-dom';

import {
  renderWithIntl,
  KeyValue,
  Accordion,
} from '@folio/stripes-erm-testing';

import SerialPOLine from './SerialPOLine';

import { translationsProperties } from '../../../../test/helpers';
import { serial } from '../../../../test/resources';

let renderComponent;
describe('SerialPOLine', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialPOLine serial={serial} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the POline Accordion heading', async () => {
    await Accordion('PO line').exists();
  });

  test('renders a the poline link', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('link', { name: 'PO line: 52590-1' })).toBeInTheDocument();
  });

  test('renders the expected Title in PO line value', async () => {
    await KeyValue('Title in PO line').has({ value: 'Interesting Times' });
  });

  test('renders the expected Order number value', async () => {
    await KeyValue('Order number').has({ value: 'No value set-' });
  });

  test('renders the expected order status value', async () => {
    await KeyValue('Order status').has({ value: 'No value set-' });
  });

  test('renders the expected Asquisition units value', async () => {
    await KeyValue('Acquisition units').has({ value: 'No value set-' });
  });

  test('renders the expected product IDs value', async () => {
    await KeyValue('Product IDs').has({ value: '' });
  });

  test('renders the expected Vendor value', async () => {
    await KeyValue('Vendor').has({ value: 'undefined (undefined)' });
  });

  test('renders the expectted funds value', async () => {
    await KeyValue('Funds').has({ value: 'USHISTEUROHIST' });
  });

  test('renders the expected material type value', async () => {
    await KeyValue('Material type').has({ value: 'No value set-' });
  });
});
