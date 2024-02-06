import { useState } from 'react';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';

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
  MessageBanner,
} from '@folio/stripes/components';

import { useHoldings, useLocations } from '../../hooks';

import {
  PIECE_SET_ENDPOINT,
  RECEIVING_PIECES_ENDPOINT,
} from '../../constants/endpoints';

import css from './GenerateReceivingModal.css';

const propTypes = {
  serial: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  pieceSet: PropTypes.object,
};

const GenerateReceivingModal = ({
  serial,
  showModal,
  setShowModal,
  pieceSet,
}) => {
  const ky = useOkapiKy();
  const { data: locations } = useLocations();

  const [successfulReceiving, setSuccessfulReceiving] = useState([]);

  const { mutateAsync: submitReceivingPiece } = useMutation(
    [
      'ui-serials-management',
      'GeneratingReceivingModal',
      'submitReceivingPiece',
    ],
    (data) => ky
      .post(RECEIVING_PIECES_ENDPOINT, { json: data?.receiving })
      .json()
      .then((res) => {
        if (successfulReceiving?.length) {
          setSuccessfulReceiving([
            ...successfulReceiving,
            { ...data?.piece, receivingId: res?.id },
          ]);
        } else {
          setSuccessfulReceiving([{ ...data?.piece, receivingId: res?.id }]);
        }
      })
  );

  const { mutateAsync: submitReceivingIds } = useMutation(
    ['ui-serials-management', 'GeneratingReceivingModal', 'submitReceivingId'],
    (data) => ky.put(PIECE_SET_ENDPOINT(pieceSet?.id), { json: data }).json()
  );

  const getInitialValues = () => {
    let holdingOrLocationId;
    if (serial?.orderLine?.remoteId_object?.locations?.length === 1) {
      if (serial?.orderLine?.remoteId_object?.locations[0]?.locationId) {
        holdingOrLocationId =
          serial?.orderLine?.remoteId_object?.locations[0]?.locationId;
      } else {
        holdingOrLocationId =
          serial?.orderLine?.remoteId_object?.locations[0]?.holdingId;
      }
    }
    return {
      holding: holdingOrLocationId,
      format: 'Physical',
      supplement: false,
      displayOnHolding: false,
    };
  };

  const formatHolding = () => {
    if (serial?.orderLine?.remoteId_object?.locations[0]?.locationId) {
      return serial?.orderLine?.remoteId_object?.locations?.map((e) => {
        const location = locations?.locations?.find(
          (l) => e?.locationId === l?.id
        );
        return { label: location?.name, value: location?.id };
      });
    } else if (serial?.orderLine?.remoteId_object?.locations[0]?.holdingId) {
      // FIXME Looking for clarifaction on where the name comes from within holdings
      return serial?.orderLine?.remoteId_object?.locations?.map((e) => {
        return { label: e?.id, value: e?.id };
      });
    } else {
      return [];
    }
  };

  const closeModal = () => {
    setSuccessfulReceiving([]);
    setShowModal(false);
  };

  const handleGeneration = async (values) => {
    const piecesArray = [];
    for (let i = 0; i < pieceSet?.pieces?.length; i++) {
      const piece = pieceSet?.pieces[i];

      if (!piece?.omissionOrigins) {
        const pieceInfo = piece?.combinationOrigins
          ? {
            date: piece?.recurrencePieces[0]?.date,
            label: piece?.recurrencePieces[0]?.date,
          }
          : { date: piece?.date, label: piece?.label };

        const submitValues = {
          receiving: {
            poLineId: serial?.orderLine?.remoteId,
            titleId: serial?.orderLine?.titleId,
            format: values?.format,
            displayOnHolding: values?.displayOnHolding,
            supplement: values?.supplement,
            displaySummary: pieceInfo?.label,
            receiptDate: pieceInfo?.date,
            holdingId: values?.holding,
          },
          piece,
        };
        piecesArray.push(submitValues);
      }
    }
    for (let i = 0; i < piecesArray?.length; i++) {
      await submitReceivingPiece(piecesArray[i]);
    }
    const submitPieceSet = { ...pieceSet, pieces: successfulReceiving };
    await submitReceivingIds(submitPieceSet);
  };

  const renderPredictedPiecesInformation = () => {
    return (
      <>
        {/* {!canCreate && !values?.invoiceLine && ( */}
        <MessageBanner type="warning">
          <FormattedMessage id="ui-serials-management.pieceSets.noOrderLineLocationsOrHoldings" />
        </MessageBanner>
        <br />
        {/* )} */}
        <div className={css.container}>
          <Row className={css.firstRow}>
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
          <Row className={css.secondRow}>
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
        </div>
      </>
    );
  };

  const renderFields = () => {
    return (
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
              dataOptions={[{ label: 'Physical', value: 'Physical' }]}
              disabled
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.pieceFormat" />
              }
              name="format"
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
              name="supplement"
              render={({ input, meta }) => (
                <Checkbox
                  component={Checkbox}
                  input={input}
                  meta={meta}
                  onChange={(e) => {
                    input.onChange(e.target.checked);
                  }}
                  type="checkbox"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Field
              component={Select}
              dataOptions={[{ label: '', value: '' }, ...formatHolding()]}
              disabled={
                serial?.orderLine?.remoteId_object?.locations?.length === 1
              }
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.holding" />
              }
              name="holding"
              required
              validate={requiredValidator}
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
              name="displayOnHolding"
              render={({ input, meta }) => (
                <Checkbox
                  component={Checkbox}
                  input={input}
                  meta={meta}
                  onChange={(e) => {
                    input.onChange(e.target.checked);
                  }}
                  type="checkbox"
                />
              )}
            />
          </Col>
        </Row>
      </>
    );
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
      initialValues={getInitialValues()}
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
