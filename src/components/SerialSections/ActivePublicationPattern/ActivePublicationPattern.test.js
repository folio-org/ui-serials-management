import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import ActivePublicationPattern from './ActivePublicationPattern';

import { translationsProperties } from '../../../../test/helpers';

import { serial } from '../../../../test/resources';

describe('ActivePublicationPattern', () => {
  describe('renders components with no serial', () => {
    beforeEach(() => {
      renderWithIntl(<ActivePublicationPattern />, translationsProperties);
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
      renderWithIntl(<ActivePublicationPattern serial={serial} />, translationsProperties);
    });
    test('renders Request number KeyValue with initial value', async () => {
      await KeyValue('Status').has({ value: 'Active' });
    });

    test('renders Request date KeyValue with initial value', async () => {
      await KeyValue('Description').has({ value: 'Test Description' });
    });
  });
});
