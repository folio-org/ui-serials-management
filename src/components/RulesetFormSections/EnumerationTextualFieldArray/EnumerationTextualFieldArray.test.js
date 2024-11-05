import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, TestForm, Button, Select } from '@folio/stripes-erm-testing';

import EnumerationTextualFieldArray from './EnumerationTextualFieldArray';
import { translationsProperties } from '../../../../test/helpers';

import mockRefdata from '../../../../test/resources/refdata';

jest.mock('../EnumerationTextualField', () => ({ level }) => <div>{`EnumerationTextualField: ${level.value}`}</div>);
const onSubmit = jest.fn();

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

let renderComponent;
describe('EnumerationTextualFieldArray', () => {
  describe('everything renders as expected', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <EnumerationTextualFieldArray // We're testing the individual performance, not field array as a whole
            name="test"
          />
        </TestForm>,
        translationsProperties
      );
    });

    test.each([
      'Pick list',
      'No. of issues',
      'Order',
      'Label text',
      'Internal note',
    ])('renders heading %s', (heading) => {
      const { getByText } = renderComponent;
      expect(getByText(heading)).toBeInTheDocument();
    });

    test('renders the Add level button', async () => {
      await Button('Add value').exists();
    });

    test('renders no levels', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationTextualField:')).not.toBeInTheDocument();
    });

    describe('Adding level', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add value').click();
        });
      });

      test('renders one level', async () => {
        const { queryByText } = renderComponent;
        await waitFor(() => {
          // TODO this feels wrong... we shouldn't ever have the user see undefined, so what's missing form our test?
          expect(queryByText('EnumerationTextualField: undefined')).toBeInTheDocument();
        });
      });
    });
  });

  describe('changing refdata', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{
            test: {
              refdataCategory: 'Global.Yes_No', // Ensure this exists?
              levels: [
                {
                  value: 'a'
                },
                {
                  value: 'b'
                },
                {
                  value: 'c'
                },
              ]
            }
          }}
          onSubmit={onSubmit}
        >
          <EnumerationTextualFieldArray // We're testing the individual performance, not field array as a whole
            name="test"
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders with expected 3 levels', () => {
      const { getByText } = renderComponent;
      expect(getByText('EnumerationTextualField: a')).toBeInTheDocument();
      expect(getByText('EnumerationTextualField: b')).toBeInTheDocument();
      expect(getByText('EnumerationTextualField: c')).toBeInTheDocument();
    });

    describe('Changing refdata', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select('Pick list*').choose('Global.Month'); // Make sure this exists?
        });
      });

      // EXAMPLE getByText not in the document, use queryByText instead
      test('level values have been reset', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('EnumerationTextualField: a')).not.toBeInTheDocument();
        expect(queryByText('EnumerationTextualField: b')).not.toBeInTheDocument();
        expect(queryByText('EnumerationTextualField: c')).not.toBeInTheDocument();
      });
    });
  });
});
