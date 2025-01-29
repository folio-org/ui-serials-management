import {
  renderWithIntl,
  TestForm,
  Accordion,
  Button,
  Pane,
  PaneHeader,
} from '@folio/stripes-erm-testing';
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
jest.mock('../../RulesetFormSections/ModelRulesetSelection', () => () => (
  <div>ModelRulesetSelection</div>
));

const onSubmit = jest.fn();
const onSelect = jest.fn();

describe('RulesetForm', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          {/* From next version handleSubmit should be passed down in TestForm children func */}
          <RulesetForm handlers={{ onClose: handlers.onClose, onSubmit, onSelect }} />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders RulesetInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('RulesetInfoForm')).toBeInTheDocument();
    });

    test('renders ModelRulesetSelection Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ModelRulesetSelection')).toBeInTheDocument();
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

    test('renders the New publication patternPane', async () => {
      await Pane('New publication pattern').is({ visible: true });
    });

    it('renders the expected Pane title', async () => {
      await PaneHeader('New publication pattern').is({ visible: true });
    });

    test('renders the Publication cycle Accordion', async () => {
      await Accordion('Publication cycle').exists();
    });

    test('renders the Omissin rules Accordion', async () => {
      await Accordion('Omission rules').exists();
    });

    test('renders the Combination rules Accordion', async () => {
      await Accordion('Combination rules').exists();
    });

    test('renders the Labelling Accordion', async () => {
      await Accordion('Labelling').exists();
    });

    test('renders the  button', async () => {
      await Button('Collapse all').exists();
    });

    test('renders the  button', async () => {
      await Button('Cancel').exists();
    });

    test('renders the  button', async () => {
      await Button('Submit').exists();
    });

    test('renders the  button', async () => {
      await Button('Preview').has({ disabled: true });
    });

    test('renders the  button', async () => {
      await Button('Save and close').has({ disabled: true });
    });
  });
});
