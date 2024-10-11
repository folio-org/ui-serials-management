import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import {
  useOrder,
} from '../../hooks';
import SerialPOLineInfo from './SerialPOLineInfo';
import { orderLine } from '../../../test/resources';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useOrder: jest.fn()
}));


let renderComponent;
describe('SerialPOLineInfo', () => {
  describe('SerialPOLineInfo', () => {
    beforeEach(() => {
      useOrder.mockClear().mockReturnValue({
        isLoading: false
      });
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialPOLineInfo orderLine={orderLine} />,
        </MemoryRouter>,
        translationsProperties
      );
    });
    test('renders the expected order number value ', async () => {
      await KeyValue('Order number').has({ value: 'No value set-' });
    });

    test('renders the expected order status value ', async () => {
      await KeyValue('Order status').has({ value: 'No value set-' });
    });

    test('renders the expected Acquisition units value ', async () => {
      await KeyValue('Acquisition units').has({ value: 'No value set-' });
    });

    test('renders the expected product IDs value ', async () => {
      await KeyValue('Product IDs').has({ value: '' });
    });

    test('renders the expected vendor value ', async () => {
      await KeyValue('Vendor').has({ value: 'undefined (undefined)' });
    });

    test('renders the expected funds value ', async () => {
      await KeyValue('Funds').has({ value: 'USHIST' });
    });

    test('renders the expected material type value ', async () => {
      await KeyValue('Material type').has({ value: 'No value set-' });
    });

    test('renders funds link ', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'USHIST' })).toBeInTheDocument();
    });
  });

  describe('SerialPOLineInfo (missing orderLine)', () => {
    beforeEach(() => {
      useOrder.mockClear().mockReturnValue({
        isLoading: false
      });

      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialPOLineInfo orderLine={null} />,
        </MemoryRouter>,
        translationsProperties
      );
    });
    test('renders the expected order number value ', async () => {
      await KeyValue('Order number').has({ value: 'No value set-' });
    });

    test('renders the expected order status value ', async () => {
      await KeyValue('Order status').has({ value: 'No value set-' });
    });

    test('renders the expected Acquisition units value ', async () => {
      await KeyValue('Acquisition units').has({ value: 'No value set-' });
    });

    test('renders the expected product IDs value ', async () => {
      await KeyValue('Product IDs').has({ value: 'No value set-' });
    });

    test('renders the expected vendor value ', async () => {
      await KeyValue('Vendor').has({ value: 'undefined (undefined)' });
    });

    test('renders the expected funds value ', async () => {
      await KeyValue('Funds').has({ value: 'No value set-' });
    });

    test('renders the expected material type value ', async () => {
      await KeyValue('Material type').has({ value: 'No value set-' });
    });
  });

  describe('SerialPOLineInfo', () => {
    beforeEach(() => {
      useOrder.mockClear().mockReturnValue({
        isLoading: true
      });
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialPOLineInfo orderLine={orderLine} />,
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the expected product IDs value ', async () => {
      await KeyValue('Product IDs').has({ value: '' });
    });

    test('renders the expected funds value ', async () => {
      await KeyValue('Funds').has({ value: 'USHIST' });
    });

    test('renders the expected material type value ', async () => {
      await KeyValue('Material type').has({ value: 'No value set-' });
    });

    test('renders funds link ', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'USHIST' })).toBeInTheDocument();
    });
  });
});
