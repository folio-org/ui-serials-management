import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import SerialInfo from './SerialInfo';

import { translationsProperties } from '../../../../test/helpers';

import { serial } from '../../../../test/resources';

describe('SerialInfo', () => {
  describe('renders components with no serial', () => {
    beforeEach(() => {
      renderWithIntl(<SerialInfo />, translationsProperties);
    });
    test('renders Request number KeyValue', async () => {
      await KeyValue('Status').exists();
    });

    test('renders Request date KeyValue', async () => {
      await KeyValue('Description').exists();
    });
  });

  describe('renders components with serial', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialInfo serial={serial} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a link with the title', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'Interesting Times' })).toBeInTheDocument();
    });

    test('renders Status KeyValue with initial value', async () => {
      await KeyValue('Status').has({ value: 'Active' });
    });

    test('renders Description KeyValue with initial value', async () => {
      await KeyValue('Description').has({ value: 'Test Description' });
    });

    test('renders Title in Receiving KeyValue with initial value', async () => {
      await KeyValue('Title in Receiving').has({ value: 'Interesting Times' });
    });
  });
});
