import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { FormModal } from '@k-int/stripes-kint-components';
import { requiredValidator } from '@folio/stripes-erm-components';
import {
  Row,
  Col,
  Button,
  ModalFooter,
  KeyValue,
  TextField,
  InfoPopover,
  Select,
  Checkbox,
  Label,
} from '@folio/stripes/components';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  pieceSet: PropTypes.object,
};

const GenerateReceivingModal = ({ showModal, setShowModal, pieceSet }) => {
  const { change } = useForm();
  const closeModal = () => {
    setShowModal(false);
  };

  const handleGeneration = async (values) => {
    console.log(values);
    closeModal();
  };

  const renderPredictedPiecesInformation = () => {
    return (
      <>
        <Row>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.totalPieces" />
              }
            >
              {pieceSet?.pieces?.length}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.pieceSetGenerated" />
              }
            >
              {pieceSet?.dateCreated}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.startDate" />
              }
            >
              {pieceSet?.startDate}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.patternId" />
              }
            >
              {pieceSet?.ruleset?.rulesetNumber}
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.firstPiece" />
              }
            >
              {pieceSet?.pieces[0]?.date}, {pieceSet?.pieces[0]?.label}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.lastPiece" />
              }
            >
              {pieceSet?.pieces[pieceSet?.pieces?.length - 1]?.date},
              {pieceSet?.pieces[pieceSet?.pieces?.length - 1]?.label}
            </KeyValue>
          </Col>
        </Row>
      </>
    );
  };

  const renderFields = () => {
    <>
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
            label={
              <>
                <FormattedMessage id="ui-serials-management.pieceSets.timeBetweenPublicationAndReceipt" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-serials-management.pieceSets.timeBetweenPublicationAndReceiptPopover" />
                  }
                />
              </>
            }
            name="interval"
            required
            type="number"
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            component={Select}
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.pieceFormat" />
            }
            name="pieceFormat"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Label>
            <FormattedMessage id="ui-serials-management.pieceSets.supplement" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-serials-management.pieceSets.supplementPopover" />
              }
              id="supplement-tooltip"
            />
          </Label>

          <Field
            component={Checkbox}
            name="supplement"
            onChange={(e) => {
              change('supplement', e.target.checked);
            }}
            type="checkbox"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            component={Select}
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.holding" />
            }
            name="holding"
          />
        </Col>
        <Col xs={3}>
          <Label>
            <FormattedMessage id="ui-serials-management.pieceSets.displayInHolding" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-serials-management.pieceSets.displayInHoldingPopover" />
              }
              id="display-on-holding-tooltip"
            />
          </Label>

          <Field
            component={Checkbox}
            name="displayOnHolding"
            onChange={(e) => {
              change('displayOnHolding', e.target.checked);
            }}
            type="checkbox"
          />
        </Col>
      </Row>
    </>;
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting } = formState;
    return (
      <>
        <ModalFooter>
          <Button
            buttonStyle="primary"
            disabled={submitting || invalid || pristine}
            marginBottom0
            onClick={handleSubmit}
            type="submit"
          >
            <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingPieces" />
          </Button>
          <Button marginBottom0 onClick={handleClose}>
            <FormattedMessage id="ui-serials-management.close" />
          </Button>
        </ModalFooter>
      </>
    );
  };

  return (
    <FormModal
      modalProps={{
        onClose: closeModal,
        open: showModal,
        label: (
          <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingPieces" />
        ),
        footer: renderFooter,
      }}
      mutators={arrayMutators}
      onSubmit={handleGeneration}
    >
      {renderPredictedPiecesInformation()}
      {renderFields()}
    </FormModal>
  );
};

GenerateReceivingModal.propTypes = propTypes;

export default GenerateReceivingModal;
