import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, TestForm, Button, Select } from '@folio/stripes-erm-testing';

import mockRefdata from '../../../../test/resources/refdata';
import LabelFieldArray from './LabelFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('react-final-form', () => ({
  ...jest.requireActual('react-final-form'),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
}));

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

jest.mock('../ChronologyField', () => () => <div>ChronologyField</div>);
jest.mock('../EnumerationNumericFieldArray', () => () => (
  <div>EnumerationNumericFieldArray</div>
));
jest.mock('../EnumerationTextualFieldArray', () => () => (
  <div>EnumerationTextualFieldArray</div>
));
const onSubmit = jest.fn();

let renderComponent;
describe('LabelFieldArray', () => {
  describe('everything renders as expected', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <LabelFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected Template label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Template')).toBeInTheDocument();
    });

    test('renders the expected empty label text', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No labels for this publication pattern')).toBeInTheDocument();
    });

    test('renders the Add label button', async () => {
      await Button('Add label').exists();
    });

    test('not renders ChronologyField', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('ChronologyField')).not.toBeInTheDocument();
    });

    test('not renders the EnumerationNumericFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationNumericFieldArray')).not.toBeInTheDocument();
    });

    test(' not renders EnumerationTextualFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationTextualFieldArray')).not.toBeInTheDocument();
    });

    describe('Adding label', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add label').click();
        });
      });

      test('renders a label card', () => {
        const { getByText } = renderComponent;
        expect(getByText('Label 1')).toBeInTheDocument();
      });

      test('renders a label style ', () => {
        const { getByText } = renderComponent;
        expect(getByText('Label style')).toBeInTheDocument();
      });

      test('renders a Select for label style', async () => {
        await Select('Label style*').exists();
      });

      test('renders the EditCard by id', () => {
        const { getByTestId } = renderComponent;
        expect(getByTestId('editCard')).toBeInTheDocument();
      });

      test('renders the Label style dropdown with correct options', async () => {
        await Select('Label style*').exists();
        await waitFor(async () => {
          await Select('Label style*').choose('Chronology');
          await Select('Label style*').choose('Enumeration');
        });
      });
    });
  });
});
