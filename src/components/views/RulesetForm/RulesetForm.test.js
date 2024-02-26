import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../test/helpers';
import RulesetForm from './RulesetForm';
import { handlers } from '../../../../test/resources';

jest.mock('../../RulesetFormSections/RulesetInfoForm', () => () => (
  <div>RulesetInfoForm</div>
));
jest.mock('../../RulesetFormSections/PatternTimePeriodForm', () => () => (
  <div>PatternTimePeriodForm</div>
));
jest.mock('../../RulesetFormSections/IssuePublicationFieldArray', () => () => (
  <div>IssuePublicationFieldArray</div>
));
jest.mock('../../RulesetFormSections/OmissionFieldArray', () => () => (
  <div>OmissionFieldArray</div>
));
jest.mock('../../RulesetFormSections/CombinationFieldArray', () => () => (
  <div>CombinationFieldArray</div>
));
jest.mock('../../RulesetFormSections/LabelFieldArray', () => () => (
  <div>LabelFieldArray</div>
));

const onSubmit = jest.fn();

describe('RulesetForm', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <RulesetForm handlers={{ onClose: handlers.onClose }} />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders RulesetInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('RulesetInfoForm')).toBeInTheDocument();
    });

    test('renders PatternTimePeriodForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PatternTimePeriodForm')).toBeInTheDocument();
    });
    test('renders OmissionFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('OmissionFieldArray')).toBeInTheDocument();
    });
    test('renders CombinationFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CombinationFieldArray')).toBeInTheDocument();
    });
    test('renders LabelFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LabelFieldArray')).toBeInTheDocument();
    });
  });
});
