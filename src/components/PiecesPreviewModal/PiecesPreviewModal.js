import { useState } from 'react';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';
import {
  Row,
  Col,
  ConfirmationModal,
  Button,
  MultiColumnList,
} from '@folio/stripes/components';

import { rulesetSubmitValuesHandler, urls, sortPieces } from '../utils';

import {
  CREATE_PREDICTED_PIECES,
  GENERATE_PIECES_PREVIEW,
} from '../../constants/endpoints';
import PiecePublicationDate from '../PiecePublicationDate';
import PiecesPreviewModalForm from './PiecesPreviewModalForm';
import { INTERNAL_OMISSION_PIECE } from '../../constants/internalPieceClasses';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  ruleset: PropTypes.object,
  existingPieceSets: PropTypes.arrayOf(PropTypes.object),
  allowCreation: PropTypes.bool,
  serialName: PropTypes.string,
};

const PiecesPreviewModal = ({
  // TODO this is one of the places I think boundaries need changing. We should be passing down the entirety of a state. It either lives here, or the outcomes get passed here (ie this gets passed an "open" prop and an "onOpen"/"onClose" handler maybe)
  showModal,
  setShowModal,
  ruleset,
  existingPieceSets,
  allowCreation = false,
  serialName,
}) => {
  const intl = useIntl();
  const ky = useOkapiKy();
  const history = useHistory();
  const [generatedPieceSet, setGeneratedPieceSet] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    values: {},
    show: false,
  });

  /* istanbul ignore next */
  const closeModal = () => {
    setShowModal(false);
    setGeneratedPieceSet(null);
  };

  const { mutateAsync: generatePieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'generatePieces'],
    (data) => ky
      .post(GENERATE_PIECES_PREVIEW, { json: data })
      .json()
      .then((res) => {
        if (!Array.isArray(res)) {
          const sortedPieceSet = { ...res, pieces: sortPieces(res?.pieces) };
          setGeneratedPieceSet(sortedPieceSet);
        } else {
          setGeneratedPieceSet(res);
        }
      })
  );

  // istanbul ignore next
  const { mutateAsync: createPieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'createPieces'],
    (data) => ky
      .post(CREATE_PREDICTED_PIECES, { json: data })
      .json()
      .then((res) => history.push(urls.pieceSetView(res?.id)))
  );

  // Slightly annoying implementation here, for future work we expect to refactor the UserConfiguredMetadata on the backend
  // At which point this should be refactored aswell
  const formatStartingValues = (values) => {
    const startingValuesArray = [];

    ruleset?.templateConfig?.chronologyRules?.forEach((rule, ruleIndex) => {
      startingValuesArray.push({
        userConfiguredTemplateMetadataType: 'chronology',
        index: rule?.index ?? ruleIndex,
        metadataType: {},
      });
    });

    ruleset?.templateConfig?.enumerationRules?.forEach((rule, ruleIndex) => {
      const tmrf =
        rule?.templateMetadataRuleFormat?.value ??
        rule?.templateMetadataRuleFormat;
      startingValuesArray.push({
        userConfiguredTemplateMetadataType: 'enumeration',
        index: rule?.index ?? ruleIndex,
        metadataType: {
          ...(tmrf === 'enumeration_numeric' && {
            levels:
              rule?.ruleFormat?.levels?.map((level, levelIndex) => ({
                ...values?.startingValues[ruleIndex]?.levels[levelIndex],
                index: level?.index ?? levelIndex,
              })) || {},
          }),
        },
      });
    });
    return startingValuesArray;
  };

  // istanbul ignore next
  const handleCreation = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
      note: values?.note,
      startingValues: formatStartingValues(values),
      numberOfCycles: values?.numberOfCycles,
    };
    await createPieces(submitValues);
  };

  // istanbul ignore next
  const handleGeneration = async (values) => {
    const submitValues = rulesetSubmitValuesHandler(ruleset);
    await generatePieces({
      ...submitValues,
      startDate: values?.startDate,
      startingValues: formatStartingValues(values),
      numberOfCycles: values?.numberOfCycles,
    });
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting, values } = formState;
    const dateExists = existingPieceSets?.some(
      (ps) => ps?.startDate === values?.startDate
    );

    return (
      <>
        {allowCreation && (
          <div
            key="generate-predicated-pieces"
            style={{ marginLeft: '0.5rem' }}
          >
            <Button
              key="generate-predicated-pieces-button"
              buttonStyle="primary"
              disabled={submitting || invalid || pristine}
              id="generate-predicted-pieces-button"
              marginBottom0
              onClick={
                dateExists
                  ? () => setConfirmationModal({ values, show: true })
                  : handleSubmit
              }
              type="submit"
            >
              <FormattedMessage id="ui-serials-management.ruleset.generate" />
            </Button>
          </div>
        )}
        <Button
          key="preview-predicated-pieces-button"
          buttonStyle={allowCreation ? 'default' : 'primary'}
          disabled={submitting || invalid || pristine}
          id="ruleset-preview-button"
          marginBottom0
          onClick={() => handleGeneration(values)}
          type="submit"
        >
          <FormattedMessage id="ui-serials-management.ruleset.preview" />
        </Button>
        <div key="close" style={{ flex: 1 }}>
          <Button
            key="close-button"
            id="close-button"
            marginBottom0
            onClick={handleClose}
          >
            <FormattedMessage id="ui-serials-management.close" />
          </Button>
        </div>
      </>
    );
  };

  // Added to prevent SonarCloud smells
  const renderPublicationDate = (piece) => {
    return <PiecePublicationDate piece={piece} />;
  };

  /* istanbul ignore next */
  const formatter = {
    // If pieces class is internal omission piece then piece is omitted
    issueCount: (e) => {
      return e?.class === INTERNAL_OMISSION_PIECE ? '-' : e.rowIndex + 1;
    },
    publicationDate: (e) => renderPublicationDate(e),
    displaySummary: (e) => {
      return e?.label;
    },
  };

  const renderPiecesTable = () => {
    return (
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              issueCount: (
                <FormattedMessage id="ui-serials-management.ruleset.issueCount" />
              ),
              publicationDate: (
                <FormattedMessage id="ui-serials-management.ruleset.issuePublicationDate" />
              ),
              displaySummary: (
                <FormattedMessage id="ui-serials-management.pieceSets.displaySummary" />
              ),
            }}
            columnWidths={{
              publicationDate: { min: 100, max: 165 },
            }}
            // We have removed the Array handling of this as of MODSER-42 which is an interface version bump
            // Should be 2.0 I believe, or 1.3, eitherway as of sunflower release this frontend no longer supports older backend interfaces
            contentData={generatedPieceSet?.pieces}
            formatter={formatter}
            id="pieces-preview-multi-columns"
            interactive={false}
            visibleColumns={['issueCount', 'publicationDate', 'displaySummary']}
          />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <FormModal
        id="pieces-preview-modal"
        initialValues={{ numberOfCycles: 1 }}
        modalProps={{
          onClose: closeModal,
          open: showModal,
          label: allowCreation ? (
            <FormattedMessage id="ui-serials-management.ruleset.generatePredictedPieces" />
          ) : (
            <FormattedMessage id="ui-serials-management.ruleset.previewPredictedPieces" />
          ),
          footer: renderFooter,
        }}
        mutators={arrayMutators}
        onSubmit={handleCreation}
      >
        <PiecesPreviewModalForm
          allowCreation={allowCreation}
          existingPieceSets={existingPieceSets}
          ruleset={ruleset}
          serialName={serialName}
        />
        {!!generatedPieceSet && renderPiecesTable()}
      </FormModal>
      <ConfirmationModal
        buttonStyle="primary"
        cancelLabel={
          <FormattedMessage id="ui-serials-management.cancelGeneration" />
        }
        confirmLabel={
          <FormattedMessage id="ui-serials-management.ruleset.generate" />
        }
        data-test-generate-confirmation-modal
        heading={
          <FormattedMessage id="ui-serials-management.ruleset.confirmGeneration" />
        }
        id="generate-confirmation-modal"
        message={
          <FormattedMessage
            id="ui-serials-management.pieceSets.overlappingDates.dialog"
            values={{
              br: <br />,
              startDate: intl.formatDate(confirmationModal?.values?.startDate, {
                timeZone: 'UTC',
              }),
              serialName,
            }}
          />
        }
        onCancel={() => setConfirmationModal({ values: {}, show: false })}
        onConfirm={() => {
          handleCreation(confirmationModal?.values);
          setConfirmationModal({ values: {}, show: false });
        }}
        open={confirmationModal.show}
      />
    </>
  );
};

PiecesPreviewModal.propTypes = propTypes;

export default PiecesPreviewModal;
