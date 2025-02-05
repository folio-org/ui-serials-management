import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Button,
  Select,
  IconButton,
} from '@folio/stripes-erm-testing';

import EnumerationFieldArray from './EnumerationFieldArray';
import { translationsProperties } from '../../../../test/helpers';
import { refdata as mockRefdata } from '../../../../test/resources';

jest.mock('../EnumerationTextualFieldArray', () => () => (
  <div>EnumerationTextualFieldArray</div>
));
jest.mock('../EnumerationNumericFieldArray', () => () => (
  <div>EnumerationNumericFieldArray</div>
));
const onSubmit = jest.fn();

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => {
    return mockRefdata.filter((mr) => {
      return (
        mr.desc === 'EnumerationTemplateMetadataRule.TemplateMetadataRuleFormat'
      );
    });
  },
}));

let renderComponent;
describe('EnumerationFieldArray', () => {
  describe('with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <EnumerationFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected empty enumeration rules label', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No enumeration labels for this publication pattern')
      ).toBeInTheDocument();
    });

    test('renders the add enumeration rule button', async () => {
      await Button('Add enumeration label').exists();
    });

    describe('clicking the add enumeration rule button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add enumeration label').click();
        });
      });

      test('renders an enumeration index card', async () => {
        const { getByText } = renderComponent;
        await waitFor(() => {
          expect(getByText('Enumeration label 1')).toBeInTheDocument();
        });
      });

      test('renders the enumeration format select field', async () => {
        await Select('Enumeration format*').exists();
      });

      describe('selecting the numeric enumeration format value', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Enumeration format*').choose('Numeric');
          });
        });

        test('renders an enumeration numeric field array', () => {
          const { queryByText } = renderComponent;
          expect(
            queryByText('EnumerationNumericFieldArray')
          ).toBeInTheDocument();
        });
      });

      describe('selecting the textual enumeration format value', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Enumeration format*').choose('Textual');
          });
        });

        test('renders an enumeration numeric field array', () => {
          const { queryByText } = renderComponent;
          expect(
            queryByText('EnumerationTextualFieldArray')
          ).toBeInTheDocument();
        });
      });

      describe('deleting the enumeration label', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await IconButton({ icon: 'trash' }).click(); // Should probs grab a specific one
          });
        });

        test('no longer renders an enumeration index card', () => {
          const { queryByText } = renderComponent;
          expect(queryByText('Enumeration label 1')).not.toBeInTheDocument();
        });
      });
    });
  });
});
