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
import { holdings, locations, serial } from '../../../../test/resources';

const onSubmit = jest.fn();

describe('GenerateReceivingModalForm', () => {
  describe('renders the component with an orderLine and locations', () => {
    beforeEach(() => {
      renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <GenerateReceivingModalForm
            locations={locations}
            orderLine={serial?.orderLine}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the TextField component with label Time between publication and receipt (days)*', async () => {
      await TextField('Time between publication and receipt (days)*').exists();
    });

    test('renders the Select component with label Piece format', async () => {
      await Select('Piece format').exists();
    });

    test('renders the Checkbox component with label Supplement', async () => {
      await Checkbox('Supplement').exists();
    });

    test('renders the Checkbox component with label Create item', async () => {
      await Checkbox('Create item').exists();
    });

    test('renders the Select component with label Location*', async () => {
      await Select('Location*').exists();
    });

    test('does not render the Checkbox component with label Display to public', async () => {
      await Checkbox('Display to public').absent();
    });

    test('does not render the Checkbox component with label Display in holding', async () => {
      await Checkbox('Display in holding').absent();
    });

    describe('filling out required fields', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await TextField(
            'Time between publication and receipt (days)*'
          ).fillIn('1');
          await Select('Location*').choose(locations[0].name);
        });
      });

      test('render TextField component Time between publication and receipt (days)* with correct value', async () => {
        await TextField('Time between publication and receipt (days)*').has({
          value: '1',
        });
      });

      test('render Select component Location* with correct value', async () => {
        await Select('Location*').has({ value: locations[0].id });
      });
    });

    describe('checking the checkboxes', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Supplement').click();
          await Checkbox('Create item').click();
        });
      });

      test('render Checkbox component Supplement as checked', async () => {
        await Checkbox('Supplement').is({ checked: true });
      });

      test('render Checkbox component Create item as checked', async () => {
        await Checkbox('Create item').is({ checked: true });
      });
    });
  });

  describe('renders the component with an orderLine, locations and holdings', () => {
    beforeEach(() => {
      renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <GenerateReceivingModalForm
            holdings={holdings}
            locations={locations}
            orderLine={serial?.orderLine}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Select component with label Holding*', async () => {
      await Select('Holding*').exists();
    });

    test('renders the Checkbox component with label Display to public', async () => {
      await Checkbox('Display to public').exists();
    });

    test('renders the Checkbox component with label Display in holding', async () => {
      await Checkbox('Display in holding').exists();
    });

    describe('filling out Holding* field', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select('Holding*').choose(
            `${locations[3].name} > ${holdings[0].callNumber}`
          );
        });
      });

      test('render Select component Holding* with correct value', async () => {
        await Select('Holding*').has({ value: holdings[0].id });
      });
    });

    describe('checking the checkboxes', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Display to public').click();
          await Checkbox('Display in holding').click();
        });
      });

      test('render Checkbox component Display to public as checked', async () => {
        await Checkbox('Display to public').is({ checked: true });
      });

      test('render Checkbox component Display in holding as checked', async () => {
        await Checkbox('Display in holding').is({ checked: true });
      });
    });
  });

  describe('renders the component with an orderLine with an empty locations property', () => {
    beforeEach(() => {
      renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <GenerateReceivingModalForm
            orderLine={{
              ...serial?.orderLine,
              remoteId_object: {
                ...serial.orderLine.remoteId_object,
                locations: [],
              },
            }}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('does not render Select component Location*', async () => {
      await Select('Location*').absent();
    });
  });
});
