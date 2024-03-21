import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, TestForm, Button, Select, IconButton } from '@folio/stripes-erm-testing';

import CombinationFieldArray from './CombinationFieldArray';
import { translationsProperties } from '../../../../test/helpers';
import mockRefdata from '../../../../test/resources/refdata';

jest.mock('../CombinationField', () => () => <div>CombinationField</div>);
const onSubmit = jest.fn();

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata.filter(mr => mr.desc === 'CombinationRule.TimeUnits'),
}));

let renderComponent;
describe('CombinationFieldArray', () => {
  describe('with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <CombinationFieldArray /> {/* This component renders a field array, so should not be within a field array here */}
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected empty combination rule label', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No combination rules for this publication pattern')
      ).toBeInTheDocument();
    });

    test('renders the Add combination rule button', async () => {
      await Button('Add combination rule').exists();
    });

    describe('clicking add combination rule button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add combination rule').click();
        });
      });

      test('renders a Combination card', () => {
        const { getByText } = renderComponent;
        expect(getByText('Combination rule 1')).toBeInTheDocument();
      });

      test('does not yet render a combination field', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('CombinationField')).not.toBeInTheDocument();
      });

      test('renders a Select for time unit', async () => {
        await Select('Time unit*').exists();
      });

      describe('selecting a time unit', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Time unit*').choose('Issue');
          });
        });

        test('renders a combination field', () => {
          const { queryByText } = renderComponent;
          expect(queryByText('CombinationField')).toBeInTheDocument();
        });
      });

      describe('deleting a combination', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await IconButton({ id: 'remove-combination-rule-0' }).click(); // Should probs grab a specific one
          });
        });

        test('does not render a Combination card', () => {
          const { queryByText } = renderComponent;
          expect(queryByText('Combination rule 1')).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('with ommision value', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{
            omission: 'testOmission'
          }}
          onSubmit={onSubmit}
        >
          <CombinationFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected empty combination rule label', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No combination rules for this publication pattern')
      ).toBeInTheDocument();
    });

    test('renders a disabled Add combination rule button', async () => {
      await Button('Add combination rule').has({ disabled: true });
    });
  });
});
