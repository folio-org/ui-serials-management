import {
  renderWithIntl,
  TestForm,
  Accordion,
  Button,
  Pane,
  PaneHeader,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import TemplateForm from './TemplateForm';
import { handlers } from '../../../../test/resources';

jest.mock('../../RulesetFormSections', () => ({
  ModelRulesetInfoForm: () => <div>ModelRulesetInfoForm</div>,
  RulesetInfoForm: () => <div>RulesetInfoForm</div>,
  PatternTimePeriodForm: () => <div>PatternTimePeriodForm</div>,
  IssuePublicationFieldArray: () => <div>IssuePublicationFieldArray</div>,
  OmissionFieldArray: () => <div>OmissionFieldArray</div>,
  CombinationFieldArray: () => <div>CombinationFieldArray</div>,
  ChronologyFieldArray: () => <div>ChronologyFieldArray</div>,
  EnumerationFieldArray: () => <div>EnumerationFieldArray</div>,
  TemplateStringField: () => <div>TemplateStringField</div>,
}));

jest.mock('../../PiecesPreviewModal', () => () => (
  <div>PiecesPreviewModal</div>
));

const onSubmit = jest.fn();

describe('TemplateForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          {/* From next version handleSubmit should be passed down in TestForm children func */}
          <TemplateForm
            handlers={{ onClose: handlers.onClose, onSubmit }}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders ModelRulesetInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ModelRulesetInfoForm')).toBeInTheDocument();
    });

    test('renders RulesetInfoForm Component inside an accordion', () => {
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

    test('renders ChronologyFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ChronologyFieldArray')).toBeInTheDocument();
    });

    test('renders EnumerationFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('EnumerationFieldArray')).toBeInTheDocument();
    });

    test('renders the New publication pattern template Pane', async () => {
      await Pane('New publication pattern template').is({ visible: true });
    });

    it('renders the expected Pane title', async () => {
      await PaneHeader('New publication pattern template').is({ visible: true });
    });

    test('renders the Publication cycle Accordion', async () => {
      await Accordion('Publication cycle').exists();
    });

    test('renders the Omission rules Accordion', async () => {
      await Accordion('Omission rules').exists();
    });

    test('renders the Combination rules Accordion', async () => {
      await Accordion('Combination rules').exists();
    });

    test('renders the Chronology Accordion', async () => {
      await Accordion('Chronology labels').exists();
    });

    test('renders the Enumeration Accordion', async () => {
      await Accordion('Enumeration labels').exists();
    });

    test('renders the Collapse all button', async () => {
      await Button('Collapse all').exists();
    });

    test('renders the Cancel button', async () => {
      await Button('Cancel').exists();
    });

    test('renders the Submit button', async () => {
      await Button('Submit').exists();
    });

    test('renders the Preview button as disabled', async () => {
      await Button('Preview').has({ disabled: true });
    });

    test('renders the Save and close button as disabled', async () => {
      await Button('Save and close').has({ disabled: true });
    });
  });
});
