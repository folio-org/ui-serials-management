import { useState } from 'react';
import { waitFor, screen } from '@folio/jest-config-stripes/testing-library/react';

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
  holdings as mockHoldings,
  locations as mockLocations,
  pieceSet,
  serial
} from '../../../test/resources';

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
    renderComponent = renderWithIntl(
      <TestComponent />,
      translationsProperties
    );
  });

  test('renders the modal', async () => {
    await Modal('Generate receiving pieces').exists();
  });

  test('renders the expected Total pieces value', async () => {
    await KeyValue('Total pieces').has({ value: '12' });
  });

  test('renders the expected Piece set generated value', async () => {
    await KeyValue('Piece set generated').has({ value: '2024-02-26T10:02:37Z' });
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

  test('renders the expected Pattern ID value', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected Pattern ID value', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Time between publication and receipt (days)')).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Piece format')).toBeInTheDocument();
  });

  it('renders expected Piece format with selected option', async () => {
    Select('Piece format').choose('Physical');
  });

  test('renders the Supplement checkbox', async () => {
    await Checkbox('Supplement').is({ checked: false });
  });

  test('renders the expected Location label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Location')).toBeInTheDocument();
  });

  test('renders the Generate receiving pieces button', async () => {
    await Button({ id: 'generate-recieving-pieces-button' }).has({ disabled: true });
  });

  describe('filling out required fields', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await TextField('Time between publication and receipt (days)*').fillIn('0');
        await Select('Location*').choose(mockLocations[0].name);
      });
    });

    test('renders the Generate receiving pieces button', async () => {
      await Button({ id: 'generate-recieving-pieces-button' }).has({ disabled: false });
    });

    describe('checking the supplement checkbox', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Supplement').click();
        });
      });

      test('supplement checkbox is now checked', async () => {
        await Checkbox('Supplement').is({ checked: true });
      });
    });
  });

  test('Close button should be enabled', async () => {
    await Button('Close').has({ disabled: false });
  });

  describe('Closing modal', () => {
    beforeEach(async () => {
      await Button('Close').click();
    });

    test('does not render the modal', async () => {
      screen.debug();
      await Modal('Generate receiving pieces').absent();
    });
  });
});
