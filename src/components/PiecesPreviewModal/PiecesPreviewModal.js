import { useEffect, useState } from 'react';
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

import { urls } from '../utils';

import {
  CREATE_PREDICTED_PIECES,
  GENERATE_PIECES_PREVIEW,
} from '../../constants/endpoints';
import PiecePublicationDate from '../PiecePublicationDate';
import PiecesPreviewModalForm from './PiecesPreviewModalForm';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  ruleset: PropTypes.object,
  pieceSets: PropTypes.arrayOf(PropTypes.object),
  allowCreation: PropTypes.bool,
  serialName: PropTypes.string,
};

const PiecesPreviewModal = ({
  showModal,
  setShowModal,
  ruleset,
  pieceSets,
  allowCreation = false,
  serialName,
}) => {
  const intl = useIntl();
  const ky = useOkapiKy();
  const history = useHistory();
  const [predictedPieces, setPredictedPieces] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    values: {},
    show: false,
  });

  /* istanbul ignore next */
  const closeModal = () => {
    setShowModal(false);
    setPredictedPieces(null);
  };

  const { mutateAsync: generatePieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'generatePieces'],
    (data) => ky
      .post(GENERATE_PIECES_PREVIEW, { json: data })
      .json()
      .then((res) => setPredictedPieces(res))
  );

  // istanbul ignore next
  const { mutateAsync: createPieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'createPieces'],
    (data) => ky
      .post(CREATE_PREDICTED_PIECES, { json: data })
      .json()
      .then((res) => history.push(urls.pieceSetView(res?.id)))
  );

  const formatStartingValues = (values) => {
    return ruleset?.templateConfig?.rules?.map((rule, ruleIndex) => {
      const tmrt =
        rule?.templateMetadataRuleType?.value ?? rule?.templateMetadataRuleType;
      const tmrf =
        rule?.ruleType?.templateMetadataRuleFormat?.value ??
        rule?.ruleType?.templateMetadataRuleFormat;
      return {
        userConfiguredTemplateMetadataType: tmrt,
        index: ruleIndex,
        metadataType: {
          ...(tmrf === 'enumeration_numeric' && {
            levels:
              rule?.ruleType?.ruleFormat?.levels?.map((_level, levelIndex) => {
                return {
                  ...values?.startingValues[ruleIndex]?.levels[levelIndex],
                  index: levelIndex,
                };
              }) || {},
          }),
        },
      };
    });
  };

  // istanbul ignore next
  const handleCreation = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
      note: values?.note,
      startingValues: formatStartingValues(values),
    };
    await createPieces(submitValues);
  };

  // istanbul ignore next
  const handleGeneration = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
      recurrence: {
        ...ruleset?.recurrence,
        rules: ruleset?.recurrence?.rules?.map((e) => {
          // If no ordinal specified, assume ordinal is 1 for all rules
          if (!e?.ordinal) {
            e.ordinal = 1;
          }
          // If no pattern fields are supplied (in the case of the day time unit)
          // Add anempty pattern object to all rules
          if (!e?.pattern) {
            e.pattern = {};
          }
          e.patternType = ruleset?.patternType;
          return e;
        }),
      },
      templateConfig: {
        ...ruleset?.templateConfig,
        rules: ruleset?.templateConfig?.rules?.map((rule, ruleIndex) => {
          rule.index = ruleIndex;
          rule?.ruleType?.ruleFormat?.levels?.forEach((level, levelIndex) => {
            level.index = levelIndex;
            return level;
          });
          return rule;
        }),
      },
      startingValues: formatStartingValues(values),
    };
    await generatePieces(submitValues);
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting, values } = formState;
    const dateExists = pieceSets?.some((ps) => ps.pieces?.some((piece) => piece.date === values.startDate));
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
          id="rulset-preview-button"
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

  const renderPublicationDate = (piece) => {
    return <PiecePublicationDate piece={piece} />;
  };

  /* istanbul ignore next */
  const formatter = {
    // If omissionOrigins exist then piece is omitted
    issueCount: (e) => {
      return e?.omissionOrigins ? '-' : e.rowIndex + 1;
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
            contentData={predictedPieces}
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
        modalProps={{
          onClose: closeModal,
          open: showModal,
          label: (
            <FormattedMessage id="ui-serials-management.ruleset.generatePredictedPieces" />
          ),
          footer: renderFooter,
        }}
        mutators={arrayMutators}
        onSubmit={handleCreation}
      >
        <PiecesPreviewModalForm
          allowCreation={allowCreation}
          pieceSets={pieceSets}
          ruleset={ruleset}
        />
        {!!predictedPieces && renderPiecesTable()}
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
              startDate: intl.formatDate(confirmationModal?.value?.startDate),
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
