import { useState } from 'react';
import { useMutation } from 'react-query';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Button,
  KeyValue,
  Select,
  Checkbox,
  TextField,
  Modal,
} from '@folio/stripes-erm-testing';

import GenerateReceivingModal from './GenerateReceivingModal';

import { translationsProperties } from '../../../test/helpers';
import {
  pieceSet,
  serial,
  holdings as mockHoldings,
  locations as mockLocations,
} from '../../../test/resources';

const INTERVAL = 0;

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + Number(days));
  return result;
};

// Copy logic to get autogenerated expected submit values
const expectedSubmitValues = pieceSet.pieces.map((p) => {
  if (!p?.omissionOrigins) {
    const pieceInfo = p?.combinationOrigins
      ? {
        date: addDays(p?.recurrencePieces[0]?.date, INTERVAL),
        label: p?.recurrencePieces[0]?.label,
      }
      : {
        date: addDays(p?.date, INTERVAL),
        label: p?.label,
      };

    return {
      receiving: {
        poLineId: serial?.orderLine?.remoteId,
        titleId: serial?.orderLine?.titleId,
        format: 'Physical',
        displayOnHolding: false,
        displayToPublic: false,
        supplement: false,
        displaySummary: pieceInfo?.label,
        receiptDate: pieceInfo?.date,
        locationId: '53cf956f-c1df-410b-8bea-27f712cca7c0',
      },
      piece: p,
    };
  }

  return [];
});

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
// Setting up jest fn here to test paramters passed in by component
const mockMutateAsync = jest.fn(() => Promise.resolve(true));
jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return {
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: jest.fn((_key, func) => ({
      mutateAsync: (...incomingParams) => {
        // Actually call function coming from component
        // This assumes that ky has been mocked, which it should have been by __mocks__ stripes-core.

        // If this function was async, we might need to do something different.
        // As it is, it's a synchronous call to ky which returns a promise we then chain on.
        func();

        // Ensure we return the promise resolve from above, so that any _subsequent_ .then calls can flow
        return mockMutateAsync(...incomingParams);
      },
    })),
  };
});

const TestComponent = () => {
  // We need actual state in here for close test
  const [showModal, setShowModal] = useState(true);

  return (
    <GenerateReceivingModal
      holdingIds={null}
      pieceSet={pieceSet}
      serial={serial}
      setShowModal={setShowModal}
      showModal={showModal}
    />
  );
};

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLocations: () => ({ isLoading: false, data: mockLocations }),
  useHoldings: () => ({ isLoading: false, data: mockHoldings }),
}));

let renderComponent;
describe('GenerateReceivingModal', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(<TestComponent />, translationsProperties);
  });

  test('useMutation has been called', () => {
    expect(useMutation).toHaveBeenCalled();
  });

  test('renders the modal', async () => {
    await Modal('Generate receiving pieces').exists();
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
    await KeyValue('Pattern ID').has({ value: 'Test Pattern ID' });
  });

  test('renders the expected First piece value', async () => {
    await KeyValue('First piece').has({ value: '2024-10-01, 5 9' });
  });

  test('renders the expected Last piecevalue', async () => {
    await KeyValue('Last piece').has({ value: '2024-05-01, 2 4' });
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(
      getByText('Time between publication and receipt (days)')
    ).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Piece format')).toBeInTheDocument();
  });

  // As of right now this field is permanently disabled -- Please fix this and uncomment this test
  /* it('renders expected Piece format with selected option', async () => {
    await waitFor(async () => {
      await Select('Piece format').choose('Physical');
    });
  }); */

  test('renders the Supplement checkbox', async () => {
    await Checkbox('Supplement').is({ checked: false });
  });

  test('does not render the Display in holding checkbox', async () => {
    await Checkbox('Display in holding').absent();
  });

  test('does not render the Display to public checkbox', async () => {
    await Checkbox('Display to public').absent();
  });

  test('renders the expected Location label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Location')).toBeInTheDocument();
  });

  /* it('renders expected Location with selected option', async () => {
 await waitFor(async () => {
   await Select('Location').choose('Annex');
   await Select('Location').choose('Main Library');
   await Select('Location').choose('Popular Reading Collection');
 });
}); */

  test('renders the Generate receiving pieces button', async () => {
    await Button({ id: 'generate-recieving-pieces-button' }).has({
      disabled: true,
    });
  });

  describe('filling out required fields', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await TextField('Time between publication and receipt (days)*').fillIn(
          '0'
        );
        await Select('Location*').choose(mockLocations[0].name);
      });
    });

    test('renders the Generate receiving pieces button', async () => {
      await Button({ id: 'generate-recieving-pieces-button' }).has({
        disabled: false,
      });
    });

    describe('checking the checkboxes', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Supplement').click();
        });
      });

      test('supplement checkbox is now checked', async () => {
        await Checkbox('Supplement').is({ checked: true });
      });
    });

    describe('calling generate', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button({ id: 'generate-recieving-pieces-button' }).click();
        });
      });

      test('mutate async called as expected', () => {
        for (let i = 0; i < expectedSubmitValues.length; i++) {
          expect(mockMutateAsync.mock.calls[i]).toStrictEqual([
            expectedSubmitValues[i],
          ]);
        }
      });

      test('does not render the modal', async () => {
        // Assumes the .then got called
        await waitFor(async () => {
          await Modal('Generate receiving pieces').absent();
        });
      });
    });
  });

  test('Close button should be enabled', async () => {
    await Button('Close').has({ disabled: false });
  });

  describe('Closing modal', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Close').click();
      });
    });

    test('does not render the modal', async () => {
      await waitFor(async () => {
        await Modal('Generate receiving pieces').absent();
      });
    });
  });

  // TODO Jack -- pls add a holdings serial example so we can test those branches
});
