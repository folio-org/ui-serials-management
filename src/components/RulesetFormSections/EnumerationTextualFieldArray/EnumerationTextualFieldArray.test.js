import { FieldArray } from 'react-final-form-arrays';

import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

import EnumerationTextualFieldArray from './EnumerationTextualFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('../EnumerationTextualField', () => () => <div>EnumerationTextualField</div>);
const onSubmit = jest.fn();

let renderComponent;
describe('EnumerationTextualFieldArray', () => {
  describe('with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <FieldArray
            component={EnumerationTextualFieldArray}
            name="templateConfig.rules[0].ruleType.ruleFormat.levels[0]"
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Pick list')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No. of issues')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Order')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Label text')).toBeInTheDocument();
    });

    test('renders the expected label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Internal note')).toBeInTheDocument();
    });

    test('renders the Add level button', async () => {
      await Button('Add value').exists();
    });
  });
});
