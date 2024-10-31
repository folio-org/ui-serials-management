import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';

import GenerateReceivingModalInfo from './GenerateReceivingModalInfo';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet, serial } from '../../../../test/resources';

const TestComponent = () => {
  // We need actual state in here for close test
  return (
    <GenerateReceivingModalInfo
      orderLineLocations={serial?.orderLine?.remoteId_object?.locations}
      pieceSet={pieceSet}
    />
  );
};

describe('GenerateReceivingModalInfo', () => {
  beforeEach(() => {
    renderWithIntl(<TestComponent />, translationsProperties);
  });

  test('renders the expected Total pieces value', async () => {
    await KeyValue('Total pieces').has({ value: '12' });
  });

  test('renders the expected Piece set generated value', async () => {
    await KeyValue('Piece set generated').has({
      value: '2024-02-26T10:02:37Z',
    });
  });

  test('renders the expected start date value', async () => {
    await KeyValue('Start date').has({ value: '2024-02-01' });
  });

  test('renders the expected Pattern ID value', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected First piece value', async () => {
    await KeyValue('First piece').has({ value: '2024-10-01, 5 9' });
  });

  test('renders the expected Last piecevalue', async () => {
    await KeyValue('Last piece').has({ value: '2024-05-01, 2 4' });
  });
});
