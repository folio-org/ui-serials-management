import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Select,
  Checkbox,
  TextField,
  TestForm,
} from '@folio/stripes-erm-testing';

import GenerateReceivingModalForm from './GenerateReceivingModalForm';

import { translationsProperties } from '../../../../test/helpers';
import {
  locations as mockLocations,
  serial,
} from '../../../../test/resources';

const onSubmit = jest.fn();

const TestComponent = () => {
  // We need actual state in here for close test
  return (
    <TestForm onSubmit={onSubmit}>
      <GenerateReceivingModalForm
        holdings={[]}
        locations={mockLocations}
        orderLine={serial?.orderLine}
      />
    </TestForm>
  );
};

let renderComponent;
describe('GenerateReceivingModal', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(<TestComponent />, translationsProperties);
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

  describe('filling out required fields', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await TextField('Time between publication and receipt (days)*').fillIn(
          '0'
        );
        await Select('Location*').choose(mockLocations[0].name);
      });
    });

    test('Select field is now has a value', async () => {
      await Select('Location*').has({ value: mockLocations[0].id });
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
  });
});
