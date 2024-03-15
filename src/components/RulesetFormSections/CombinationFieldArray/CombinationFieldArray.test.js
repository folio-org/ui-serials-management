import { FieldArray } from 'react-final-form-arrays';

import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

import CombinationFieldArray from './CombinationFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('../CombinationField', () => () => <div>CombinationField</div>);
const onSubmit = jest.fn();

let renderComponent;
describe('CombinationFieldArray', () => {
  describe('with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <FieldArray
            component={CombinationFieldArray}
            name="combination.rules"
          />
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
  });
});
