import { FieldArray } from 'react-final-form-arrays';
import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

import LabelFieldArray from './LabelFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('react-final-form', () => ({
  ...jest.requireActual('react-final-form'),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
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
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <FieldArray
          component={LabelFieldArray}
          name="templateConfig.rules[0].ruleType.ruleFormat"
        />
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
});
