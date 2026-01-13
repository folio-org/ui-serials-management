import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState, useForm } from 'react-final-form';

import { AppIcon } from '@folio/stripes/core';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ExpandAllButton,
  HasCommand,
  IconButton,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  PaneMenu,
  Row,
  expandAllSections,
  collapseAllSections,
  checkScope,
} from '@folio/stripes/components';

import { handleSaveKeyCommand } from '../../utils';

import {
  PatternTimePeriodForm,
  IssuePublicationFieldArray,
  OmissionFieldArray,
  CombinationFieldArray,
  ChronologyFieldArray,
  EnumerationFieldArray,
  TemplateStringField,
} from '../../RulesetFormSections';

import PiecesPreviewModal from '../../PiecesPreviewModal';

// Shared ruleset sections: publication cycle, omission, combination, chronology, enumeration
export const RulesetSections = ({ values, getFieldState }) => (
  <>
    <Accordion
      label={
        <FormattedMessage id="ui-serials-management.ruleset.publicationCycle" />
      }
    >
      <PatternTimePeriodForm />
      {values?.recurrence?.timeUnit &&
        values?.recurrence?.issues >= 1 &&
        getFieldState('recurrence.issues')?.valid && (
          <IssuePublicationFieldArray />
      )}
    </Accordion>
    <Accordion
      label={
        <FormattedMessage id="ui-serials-management.ruleset.omissionRules" />
      }
    >
      <OmissionFieldArray />
    </Accordion>
    <Accordion
      label={
        <FormattedMessage id="ui-serials-management.ruleset.combinationRules" />
      }
    >
      <CombinationFieldArray />
    </Accordion>
    <Accordion
      label={
        <FormattedMessage id="ui-serials-management.ruleset.chronologyLabels" />
      }
    >
      <ChronologyFieldArray />
    </Accordion>
    <Accordion
      label={
        <FormattedMessage id="ui-serials-management.ruleset.enumerationLabels" />
      }
    >
      <EnumerationFieldArray />
    </Accordion>
  </>
);

RulesetSections.propTypes = {
  values: PropTypes.object,
  getFieldState: PropTypes.func.isRequired,
};

const propTypes = {
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeButtonId: PropTypes.string.isRequired,
  infoSection: PropTypes.node.isRequired,
  renderAccordions: PropTypes.func.isRequired,
  getPreviewDisabled: PropTypes.func.isRequired,
  getSaveDisabled: PropTypes.func.isRequired,
};

const RulesetFormLayout = ({
  title,
  onClose,
  onSubmit,
  closeButtonId,
  infoSection,
  renderAccordions,
  getPreviewDisabled,
  getSaveDisabled,
}) => {
  const { pristine, submitting, invalid, values } = useFormState();

  const { getFieldState } = useForm();
  const [showModal, setShowModal] = useState(false);
  const accordionStatusRef = createRef();

  // istanbul ignore next
  const shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, onSubmit, pristine, submitting),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  const previewDisabled = getPreviewDisabled({
    pristine,
    invalid,
    submitting,
    values,
    getFieldState,
  });

  const saveDisabled = getSaveDisabled({
    pristine,
    invalid,
    submitting,
    values,
    getFieldState,
  });

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-serials-management.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id={closeButtonId}
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <>
            <Button
              buttonStyle="default mega"
              disabled={previewDisabled}
              marginBottom0
              onClick={() => setShowModal(!showModal)}
            >
              <FormattedMessage id="ui-serials-management.ruleset.preview" />
            </Button>
            <Button
              buttonStyle="primary mega"
              disabled={saveDisabled}
              marginBottom0
              onClick={onSubmit}
              type="submit"
            >
              <FormattedMessage id="stripes-components.saveAndClose" />
            </Button>
          </>
        }
        renderStart={
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={() => onClose()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        }
      />
    );
  };

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          appIcon={<AppIcon app="serials-management" />}
          centerContent
          defaultWidth="100%"
          firstMenu={renderFirstMenu()}
          footer={renderPaneFooter()}
          renderHeader={(renderProps) => (
            <PaneHeader {...renderProps} paneTitle={title} />
          )}
        >
          {infoSection}
          <AccordionStatus ref={accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet>
              {renderAccordions({ values, getFieldState })}
            </AccordionSet>
          </AccordionStatus>
          <TemplateStringField />
        </Pane>
        <PiecesPreviewModal
          ruleset={values}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </Paneset>
    </HasCommand>
  );
};

RulesetFormLayout.propTypes = propTypes;

export default RulesetFormLayout;
