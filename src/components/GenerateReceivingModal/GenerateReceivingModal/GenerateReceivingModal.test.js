import { useState } from 'react';
import { useMutation } from 'react-query';
import omit from 'lodash/omit';

import {
  renderWithIntl,
  Button,
  Modal,
  Select,
  TextField,
} from '@folio/stripes-erm-testing';

// EXAMPLE reading the output from mockKy
import { mockKy } from '@folio/stripes/core';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import GenerateReceivingModal from './GenerateReceivingModal';

import { translationsProperties } from '../../../../test/helpers';
import {
  pieceSet,
  serial,
  holdings as mockHoldings,
  locations as mockLocations,
} from '../../../../test/resources';

jest.mock('../GenerateReceivingModalInfo', () => () => (
  <div>GenerateReceivingModalInfo</div>
));

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useInstanceHoldingsQuery: () => ({
    isLoading: false,
    holdings: mockHoldings,
  }),
  useLocationsQuery: () => ({ isLoading: false, locations: mockLocations }),
}));

// Option to be selected in 'Location' dropdown
const selectedLocationOption = mockLocations.find((l) => l.name === 'Annex');

const TestComponent = () => {
  // We need actual state in here for close test
  const [showModal, setShowModal] = useState(true);

  const onClose = () => setShowModal(true);

  return (
    <GenerateReceivingModal
      onClose={onClose}
      open={showModal}
      orderLine={serial?.orderLine}
      pieceSet={pieceSet}
    />
  );
};

// TODO this test complains about rendering forwardRef... Maybe it's the formModal stuff. Again though, we ought to fix that.
describe('GenerateReceivingModal', () => {
  beforeEach(() => {
    renderWithIntl(<TestComponent />, translationsProperties);
  });

  test('useMutation has been called', () => {
    expect(useMutation).toHaveBeenCalled();
  });

  test('renders the modal', async () => {
    await Modal('Generate receiving pieces').exists();
  });

  test('renders the Generate receiving pieces button (disabled)', async () => {
    await waitFor(async () => {
      await Button('Generate receiving pieces').has({
        disabled: true,
      });
    });
  });

  describe('filling out generate modal form', () => {
    beforeEach(async () => {
      // Fill out fake value to enable button
      await waitFor(async () => {
        await TextField({ id: 'interval-field' }).fillIn('3');
        await Select('Location*').chooseAndBlur(selectedLocationOption?.name);
      });
    });

    test('renders the filled value as expected', async () => {
      await waitFor(async () => {
        await TextField({ id: 'interval-field' }).has({ value: '3' });
      });
    });

    test('renders the location value as expected', async () => {
      await waitFor(async () => {
        // Switch this from using hardcoded Id to using find on mockLocations
        await Select('Location*').has({
          value: selectedLocationOption.id,
        });
      });
    });

    test('renders the Generate receiving pieces button (enabled)', async () => {
      await waitFor(async () => {
        await Button('Generate receiving pieces').has({
          disabled: false,
        });
      });
    });

    describe('clicking generate button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Generate receiving pieces').click();
        });
      });

      // Since we're now using the order/parts endpoint, should only be making one call to orders
      test('submitReceivingPieces went to the right endpoint', () => {
        // mock.calls[0][0] is the first argument (endpoint)
        const endpointCalled = mockKy.mock.calls[0][0];
        expect(endpointCalled).toBe('orders/pieces-batch');
      });

      test('submitReceivingPieces sent the right information', () => {
        const firstReceivingPiece = mockKy.mock.calls[0][1]?.json?.pieces?.[0];

        // First thing to check is that display summary is correct
        expect(firstReceivingPiece.displaySummary?.toString()).toEqual('5 9');
        // Secondly, check the recieptDate is the piece date adjusted by interval
        // In this case its 2024-10-01 + 3 days
        // We're using toLocaleDateString to avoid timezone issues when running on different environments
        // Should be ok since piece date is always at midnight, will want a refactor when we move to dayjs
        expect(
          new Date(firstReceivingPiece.receiptDate).toLocaleDateString('en')
        ).toEqual('10/4/2024');

        // Check the rest of the values, values that are taken from the serial, form values and defaults
        // Id is somewhat irrelevant, since we actually want to make sure the same one is being passed to the next call
        expect(
          omit(firstReceivingPiece, ['receiptDate', 'id', 'displaySummary'])
        ).toEqual({
          // Defined by serial
          poLineId: serial?.orderLine?.remoteId,
          titleId: serial?.orderLine?.titleId,
          // Selected form values
          locationId: selectedLocationOption.id,
          // Defaults
          displayOnHolding: false,
          displayToPublic: false,
          format: 'Physical',
          supplement: false,
        });
      });

      test('submitReceivingIds went to the right endpoint', () => {
        // mock.calls[1][0] is the first argument (endpoint)
        const endpointCalled = mockKy.mock.calls[1][0];
        expect(endpointCalled).toBe(
          `serials-management/predictedPieces/${pieceSet.id}`
        );
      });

      test('submitReceivingIds sent the right information', () => {
        const firstInternalPiece = mockKy.mock.calls[1][1]?.json?.pieces?.[0];

        // Check that the receivingId is the same as the one generated in the first call
        // This is the only real important thing that matters wth regards to this call
        expect(
          firstInternalPiece.receivingPieces?.[0]?.receivingId?.toString()
        ).toEqual(mockKy.mock.calls[0][1]?.json?.pieces?.[0]?.id?.toString());
      });
    });
  });
});
