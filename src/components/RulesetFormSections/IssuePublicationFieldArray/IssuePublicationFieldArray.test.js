import { FieldArray } from 'react-final-form-arrays';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import IssuePublicationFieldArray from './IssuePublicationFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('../IssuePublicationField', () => () => <div>IssuePublicationField</div>);
const onSubmit = jest.fn();

let renderComponent;
describe('IssuePublicationFieldArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <FieldArray
          component={IssuePublicationFieldArray}
          name="templateConfig.rules[0].ruleType.ruleFormat.levels[0]"
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Days of publication, per cycle')).toBeInTheDocument();
  });
});
