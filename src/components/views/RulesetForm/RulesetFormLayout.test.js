import {
  renderWithIntl,
  TestForm,
  Pane,
  PaneHeader,
  Button,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import RulesetFormLayout from './RulesetFormLayout';

jest.mock('../../RulesetFormSections', () => ({
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
const onClose = jest.fn();

describe('RulesetFormLayout', () => {
  let renderComponent;
  const infoSection = <div>InfoSection</div>;
  const renderAccordions = jest.fn(() => <div>AccordionsContent</div>);

  const getPreviewDisabled = jest.fn(() => true);
  const getSaveDisabled = jest.fn(() => false);

  describe('renders layout with provided props', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <RulesetFormLayout
            closeButtonId="close-ruleset-form-button"
            getPreviewDisabled={getPreviewDisabled}
            getSaveDisabled={getSaveDisabled}
            infoSection={infoSection}
            onClose={onClose}
            onSubmit={onSubmit}
            renderAccordions={renderAccordions}
            title="New publication pattern"
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Pane with the expected title', async () => {
      await Pane('New publication pattern').is({ visible: true });
      await PaneHeader('New publication pattern').is({ visible: true });
    });

    test('renders the infoSection content', () => {
      const { getByText } = renderComponent;
      expect(getByText('InfoSection')).toBeInTheDocument();
    });

    test('renders the accordions via renderAccordions', () => {
      const { getByText } = renderComponent;
      expect(getByText('AccordionsContent')).toBeInTheDocument();
      expect(renderAccordions).toHaveBeenCalled();
    });

    test('renders the Preview button with disabled state from getPreviewDisabled', async () => {
      await Button('Preview').has({ disabled: true });
      expect(getPreviewDisabled).toHaveBeenCalled();
    });

    test('renders the Save and close button with disabled state from getSaveDisabled', async () => {
      await Button('Save and close').has({ disabled: false });
      expect(getSaveDisabled).toHaveBeenCalled();
    });

    test('renders the Cancel button', async () => {
      await Button('Cancel').exists();
    });
  });
});
