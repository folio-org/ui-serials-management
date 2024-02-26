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
    beforeEach(() => {
      renderWithIntl(<SerialInfo serial={serial} />, translationsProperties);
    });
    test('renders Request number KeyValue with initial value', async () => {
      await KeyValue('Status').has({ value: 'Active' });
    });

    test('renders Request date KeyValue with initial value', async () => {
      await KeyValue('Description').has({ value: 'Test Description' });
    });
  });
});
