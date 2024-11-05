import {
  renderWithIntl,
  KeyValue,
  MessageBanner,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';

import {
  pieceSet,
  omissionPieceSet,
  serial,
  combinationPieceSet,
} from '../../../../test/resources';

import GenerateReceivingModalInfo from './GenerateReceivingModalInfo';

describe('GenerateReceivingModalInfo', () => {
  describe('render component with locations and standard pieceset', () => {
    beforeEach(() => {
      renderWithIntl(
        <GenerateReceivingModalInfo
          orderLineLocations={serial?.orderLine?.remoteId_object?.locations}
          pieceSet={pieceSet}
        />,
        translationsProperties
      );
    });

    test('renders the "Generate receiving info" message', async () => {
      await MessageBanner(
        "Selecting 'Generate receiving pieces' will create new pieces in the Receiving app. Please wait while the pieces are generated. This window will close when the process is complete."
      ).exists();
    });

    test.each([
      { keyValueLabel: 'Total pieces', value: '12' },
      { keyValueLabel: 'Piece set generated', value: '2024-02-26T10:02:37Z' },
      { keyValueLabel: 'Start date', value: '2024-02-01' },
      { keyValueLabel: 'Pattern ID', value: 'Test Pattern ID' },
      { keyValueLabel: 'First piece', value: '2024-10-01, 5 9' },
      { keyValueLabel: 'Last piece', value: '2024-05-01, 2 4' },
    ])(
      'renders KeyValue component with label $keyValueLabel with value $value ',
      async ({ keyValueLabel, value }) => {
        await KeyValue(keyValueLabel).has({ value });
      }
    );

    test('Does not render the "No orderline locations or holdings" message', async () => {
      await MessageBanner(
        'There are no locations or holdings for the linked POL and receiving pieces will be created with no location or holding. To add a location or holding please update the PO line.'
      ).exists();
    });
  });

  describe('render component with no locations and standard pieceset', () => {
    beforeEach(() => {
      renderWithIntl(
        <GenerateReceivingModalInfo
          orderLineLocations={[]}
          pieceSet={pieceSet}
        />,
        translationsProperties
      );
    });

    test('renders the "No orderline locations or holdings" message', async () => {
      await MessageBanner(
        'There are no locations or holdings for the linked POL and receiving pieces will be created with no location or holding. To add a location or holding please update the PO line.'
      ).exists();
    });
  });

  describe('render component with an omissionPieceSet in which the first/last piece is omitted', () => {
    beforeEach(() => {
      renderWithIntl(
        <GenerateReceivingModalInfo
          orderLineLocations={[]}
          pieceSet={omissionPieceSet}
        />,
        translationsProperties
      );
    });

    test('renders the First piece KeyValue component with value only containing a date', async () => {
      await KeyValue('First piece').has({ value: '2025-01-01' });
    });
  });

  describe('render component with a combinationPieceSet in which the first/last piece is combined', () => {
    beforeEach(() => {
      renderWithIntl(
        <GenerateReceivingModalInfo
          orderLineLocations={[]}
          pieceSet={combinationPieceSet}
        />,
        translationsProperties
      );
    });

    test('renders the First piece KeyValue component with value containing the date and label of the first of the combined pieces', async () => {
      await KeyValue('First piece').has({
        value: '2025-01-01, Wednesday 1 January 2025',
      });
    });
  });
});
