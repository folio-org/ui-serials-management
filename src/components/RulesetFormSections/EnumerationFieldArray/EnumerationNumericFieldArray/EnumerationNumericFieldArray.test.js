import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

import EnumerationNumericFieldArray from './EnumerationNumericFieldArray';
import { translationsProperties } from '../../../../../test/helpers';

jest.mock('./EnumerationNumericField', () => () => (
  <div>EnumerationNumericField</div>
));
const onSubmit = jest.fn();

let renderComponent;
describe('EnumerationNumericFieldArray', () => {
  describe('with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <EnumerationNumericFieldArray name="templateConfig.rules[0].ruleType.ruleFormat" />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Level')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No. of units')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Format')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Sequence')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Internal note')).toBeInTheDocument();
    });

    test('renders the Add level button', async () => {
      await Button('Add level').exists();
    });

    describe('Adding level', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add level').click();
        });
      });

      test('renders one level', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('EnumerationTextualField')).not.toBeInTheDocument();
      });
    });
  });
});
