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
  holdingIds: PropTypes.arrayOf(PropTypes.string),
};

const GenerateReceivingModal = ({
  serial,
  showModal,
  setShowModal,
  pieceSet,
  holdingIds,
}) => {
  const ky = useOkapiKy();
  const { data: locations } = useLocations();
  const { data: holdings } = useHoldings(holdingIds);

  const [successfulReceiving, setSuccessfulReceiving] = useState([]);

  const closeModal = () => {
    setSuccessfulReceiving([]);
    setShowModal(false);
  };

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
        const newReceiving = [...successfulReceiving];
        newReceiving.push({ id: data?.piece?.id, receivingId: res?.id });
        setSuccessfulReceiving(newReceiving);
      })
  );

  const { mutateAsync: submitReceivingIds } = useMutation(
    ['ui-serials-management', 'GeneratingReceivingModal', 'submitReceivingId'],
    (data) => ky
      .put(PIECE_SET_ENDPOINT(pieceSet?.id), { json: data })
      .json()
      .then(() => {
        closeModal();
      })
  );

  const getInitialValues = () => {
    const fixedInitialValues = {
      format: 'Physical',
      supplement: false,
      displayOnHolding: false,
    };
    if (serial?.orderLine?.remoteId_object?.locations?.length === 1) {
      if (holdingIds) {
        return {
          holdingId: holdingIds[0],
          ...fixedInitialValues,
        };
      } else {
        return {
          locationId:
            serial?.orderLine?.remoteId_object?.locations?.[0]?.locationId,
          ...fixedInitialValues,
        };
      }
    }
    return { ...fixedInitialValues };
  };

  const formatDataOptions = () => {
    if (serial?.orderLine?.remoteId_object?.locations?.length) {
      if (!holdingIds && locations?.length) {
        return serial?.orderLine?.remoteId_object?.locations?.map((e) => {
          const location = locations?.find((l) => e?.locationId === l?.id);
          return { label: location?.name, value: location?.id };
        });
      } else if (locations?.length && holdings?.length) {
        return holdings?.map((h) => {
          const holdingLocation = locations.find(
            (l) => h?.permanentLocationId === l?.id
          );
          return {
            label: `${holdingLocation?.name} > ${h?.callNumber}`,
            value: h?.id,
          };
        });
      }
    }
    return [];
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + Number(days));
    return result;
  };

  const handleGeneration = async (values) => {
    const piecesArray = [];
    for (const piece of pieceSet?.pieces) {
      if (!piece?.omissionOrigins) {
        const pieceInfo = piece?.combinationOrigins
          ? {
            date: addDays(piece?.recurrencePieces[0]?.date, values?.interval),
            label: piece?.recurrencePieces[0]?.label,
          }
          : {
            date: addDays(piece?.date, values?.interval),
            label: piece?.label,
          };

        const submitValues = {
          receiving: {
            poLineId: serial?.orderLine?.remoteId,
            titleId: serial?.orderLine?.titleId,
            format: values?.format,
            displayOnHolding: values?.displayOnHolding,
            supplement: values?.supplement,
            displaySummary: pieceInfo?.label,
            receiptDate: pieceInfo?.date,
            ...(values?.holdingId && { holdingId: values?.holdingId }),
            ...(values?.locationId && { locationId: values?.locationId }),
          },
          piece,
        };
        piecesArray.push(submitValues);
      }
    }
    for (const receivingPiece of piecesArray) {
      await submitReceivingPiece(receivingPiece);
    }
    const submitPieceSet = { id: pieceSet?.id, pieces: successfulReceiving };
    await submitReceivingIds(submitPieceSet);
  };

  const renderPredictedPiecesInformation = () => {
    return (
      <>
        {!serial?.orderLine?.remoteId_object?.locations?.length && (
          <>
            <MessageBanner type="warning">
              <FormattedMessage id="ui-serials-management.pieceSets.noOrderLineLocationsOrHoldings" />
            </MessageBanner>
            <br />
          </>
        )}
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
                {pieceSet?.pieces[pieceSet?.pieces?.length - 1]?.date},{' '}
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
          {serial?.orderLine?.remoteId_object?.locations?.length && (
            <Col xs={6}>
              <Field
                component={Select}
                dataOptions={[{ label: '', value: '' }, ...formatDataOptions()]}
                disabled={
                  serial?.orderLine?.remoteId_object?.locations?.length === 1
                }
                label={
                  holdingIds ? (
                    <FormattedMessage id="ui-serials-management.pieceSets.holding" />
                  ) : (
                    <FormattedMessage id="ui-serials-management.pieceSets.location" />
                  )
                }
                name={holdingIds ? 'holdingId' : 'locationId'}
                required
                validate={requiredValidator}
              />
            </Col>
          )}
          {holdingIds?.length && (
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
          )}
        </Row>
      </>
    );
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting } = formState;
    return (
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
