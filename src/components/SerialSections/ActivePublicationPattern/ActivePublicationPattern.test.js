import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import ActivePublicationPattern from './ActivePublicationPattern';

import { translationsProperties } from '../../../../test/helpers';

import { serial } from '../../../../test/resources';

describe('ActivePublicationPattern', () => {
  describe('renders components with serial', () => {
    beforeEach(() => {
      renderWithIntl(
        <ActivePublicationPattern serial={serial} />,
        translationsProperties
      );
    });
    test('renders pattern Id KeyValue', async () => {
      await KeyValue('Pattern ID').exists();
    });

    test('renders status KeyValue', async () => {
      await KeyValue('Status').exists();
    });

    test('renders last updated KeyValue', async () => {
      await KeyValue('Last updated').exists();
    });

    test('renders Time unit KeyValue', async () => {
      await KeyValue('Time unit').exists();
    });

    test('renders Number of months KeyValue', async () => {
      await KeyValue('Number of months').exists();
    });

    test('renders No. of issues published per cycle KeyValue', async () => {
      await KeyValue('No. of issues published per cycle').exists();
    });
  });
});
