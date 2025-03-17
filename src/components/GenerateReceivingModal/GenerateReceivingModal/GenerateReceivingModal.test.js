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

  // test('renders the GenerateReceivingModalInfo component', () => {
  //   const { getByText } = renderComponent;
  //   expect(getByText('GenerateReceivingModalInfo')).toBeInTheDocument();
  // });

  // test('renders the GenerateReceivingModalInfo component', () => {
  //   const { getByText } = renderComponent;
  //   expect(getByText('GenerateReceivingModalForm')).toBeInTheDocument();
  // });

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
        await Select('Location*').chooseAndBlur('Annex');
      });
    });

    test('renders the filled value as expected', async () => {
      await waitFor(async () => {
        await TextField({ id: 'interval-field' }).has({ value: '3' });
      });
    });

    test('renders the location value as expected', async () => {
      await waitFor(async () => {
        // FIXME this isn't great -- would rather use option label if you can figure that out -- or centralised testing. This needs work
        await Select('Location*').has({
          value: '53cf956f-c1df-410b-8bea-27f712cca7c0',
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

      // mock.calls[0] is the first call -- we iterate over a lot of calls here so we should test them all (I know this will change)
      test('submitReceivingIds went to the right endpoint', () => {
        // mock.calls[0][0] is the first argument (endpoint)
        expect(mockKy.mock.calls[0][0]).toBe('orders/pieces-batch');
      });

      // FIXME Jack I have no idea where this info comes from, idk if this is the right stuff to test
      test('submitReceivingIds sent the right information', () => {
        const firstSendReceivingPiece =
          mockKy.mock.calls[0][1]?.json?.pieces?.[0];
        // FIXME you can do better than this Jack -- proof of concept
        console.log(firstSendReceivingPiece);
        expect(firstSendReceivingPiece.receiptDate?.toString()).toEqual(
          'Fri Oct 04 2024 01:00:00 GMT+0100 (British Summer Time)'
        );

        // mock.calls[0][1] is the second argument (data)
        expect(omit(firstSendReceivingPiece, ['receiptDate', 'id'])).toEqual({
          displayOnHolding: false,
          displayToPublic: false,
          locationId: '53cf956f-c1df-410b-8bea-27f712cca7c0',
          displaySummary: '5 9',
          format: 'Physical',
          poLineId: 'baec48dd-1594-2712-be8f-de336bc83fcc',
          supplement: false,
          titleId: '7cef39f1-4fb1-49d5-9a6b-a072e632144d',
        });
      });
    });
  });
});
