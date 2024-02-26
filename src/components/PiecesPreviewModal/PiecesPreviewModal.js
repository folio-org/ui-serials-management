import { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';
import {
  Datepicker,
  Row,
  Col,
  Button,
  MultiColumnList,
  FormattedDate,
  Label,
  TextField,
  Layout,
  TextArea,
} from '@folio/stripes/components';

import { requiredValidator, InfoBox } from '@folio/stripes-erm-components';

import { urls, validateWithinRange } from '../utils';

import css from './PiecesPreviewModal.css';

import {
  CREATE_PREDICTED_PIECES,
  GENERATE_PIECES_PREVIEW,
} from '../../constants/endpoints';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  ruleset: PropTypes.object,
  allowCreation: PropTypes.bool,
};

const PiecesPreviewModal = ({
  showModal,
  setShowModal,
  ruleset,
  allowCreation = false,
}) => {
  const ky = useOkapiKy();
  const history = useHistory();
  const [predictedPieces, setPredictedPieces] = useState(null);

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

  const { mutateAsync: createPieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'createPieces'],
    (data) => ky
      .post(CREATE_PREDICTED_PIECES, { json: data })
      .json()
      .then((res) => history.push(urls.pieceSetView(res?.id)))
  );

  const handleCreation = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
      note: values?.note,
    };
    submitValues?.templateConfig?.rules?.forEach((rule, ruleIndex) => {
      if (values?.startingValues) {
        if (
          values?.startingValues[ruleIndex]?.levels?.length &&
          rule?.ruleType?.ruleFormat?.levels?.length
        ) {
          rule?.ruleType?.ruleFormat?.levels?.forEach((level, levelIndex) => {
            level.startingValue =
              values?.startingValues[ruleIndex]?.levels[levelIndex]?.value;
          });
        }
      }
    });
    await createPieces(submitValues);
  };

  // TODO This could be put into some nice util functions to handle

  const handleGeneration = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
    };
    submitValues?.recurrence?.rules?.forEach((e) => {
      // If no ordinal specified, assume ordinal is 1 for all rules
      if (!e?.ordinal) {
        e.ordinal = '1';
      }
      // If no pattern fields are supplied (in the case of the day time unit)
      // Add anempty pattern object to all rules
      if (!e?.pattern) {
        e.pattern = {};
      }
      e.patternType = submitValues?.patternType;
    });
    submitValues?.templateConfig?.rules?.forEach((rule, ruleIndex) => {
      if (values?.startingValues) {
        if (
          values?.startingValues[ruleIndex]?.levels?.length &&
          rule?.ruleType?.ruleFormat?.levels?.length
        ) {
          rule?.ruleType?.ruleFormat?.levels?.forEach((level, levelIndex) => {
            level.startingValue =
              values?.startingValues[ruleIndex]?.levels[levelIndex]?.value;
          });
        }
      }
    });
    submitValues?.templateConfig?.rules?.forEach((r, ri) => {
      r.index = ri;
      r?.ruleType?.ruleFormat?.levels?.forEach((l, li) => {
        l.index = li;
      });
    });
    await generatePieces(submitValues);
  };

  // The following predicted pieces are currently placeholders for testing
  // Will be replaced with more concrete designs later
  // FIXME COMBINED PIECES TRANSLATION
  const formatter = {
    // If omissionOrigins exist then piece is omitted
    issueCount: (e) => {
      return e?.omissionOrigins ? '-' : e.rowIndex + 1;
    },
    publicationDate: (e) => {
      if (e?.recurrencePieces) {
        return (
          <>
            <FormattedDate value={e?.recurrencePieces[0].date} />
            <br />
            {`Combined pieces: ${e?.recurrencePieces.length}`}
          </>
        );
      }
      return (
        <>
          <FormattedDate value={e?.date} />
          {e?.omissionOrigins && (
            <InfoBox type="success">
              <FormattedMessage id="ui-serials-management.pieceSets.omitted" />
            </InfoBox>
          )}
        </>
      );
    },
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
            interactive={false}
            visibleColumns={['issueCount', 'publicationDate', 'displaySummary']}
          />
        </Col>
      </Row>
    );
  };

  const renderEnumerationNumericField = (formatValues, index) => {
    return (
      <>
        <Row>
          <Col xs={2}>
            <Layout className="textCentered padding-top-gutter">
              <strong>
                <FormattedMessage
                  id="ui-serials-management.ruleset.labelIndex"
                  values={{ index: index + 1 }}
                />
              </strong>
            </Layout>
          </Col>
          {formatValues?.ruleType?.ruleFormat?.levels?.map((e, i) => {
            return (
              <Col xs={2}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage
                      id="ui-serials-management.ruleset.levelIndex"
                      values={{ index: i + 1 }}
                    />
                  }
                  name={`startingValues[${index}].levels[${i}].value`}
                  type="number"
                  validate={
                    e?.sequence?.value === 'reset'
                      ? validateWithinRange(1, e?.units)
                      : null
                  }
                />
              </Col>
            );
          })}
        </Row>
      </>
    );
  };

  const renderTemplateStartingValues = () => {
    return (
      <>
        <div className={css.container}>
          <Row>
            <Col xs={12}>
              <Label>
                <FormattedMessage id="ui-serials-management.ruleset.valuesToUseForFirstIssue" />
              </Label>
            </Col>
          </Row>
          <br />
          {ruleset?.templateConfig?.rules?.map((e, i) => {
            if (
              e?.ruleType?.templateMetadataRuleFormat?.value ===
                'enumeration_numeric' ||
              e?.ruleType?.templateMetadataRuleFormat === 'enumeration_numeric'
            ) {
              return (
                <>
                  {renderEnumerationNumericField(e, i)}
                  <br />
                </>
              );
            }
            return null;
          })}
        </div>
      </>
    );
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting, values } = formState;
    return (
      <>
        {allowCreation && (
          <div style={{ marginLeft: '0.5rem' }}>
            <Button
              buttonStyle="primary"
              disabled={submitting || invalid || pristine}
              marginBottom0
              onClick={handleSubmit}
              type="submit"
            >
              <FormattedMessage id="ui-serials-management.ruleset.generate" />
            </Button>
          </div>
        )}
        <Button
          buttonStyle="default"
          disabled={submitting || invalid || pristine}
          marginBottom0
          onClick={() => handleGeneration(values)}
          type="submit"
        >
          <FormattedMessage id="ui-serials-management.ruleset.preview" />
        </Button>
        <div style={{ flex: 1 }}>
          <Button marginBottom0 onClick={handleClose}>
            <FormattedMessage id="ui-serials-management.close" />
          </Button>
        </div>
      </>
    );
  };

  return (
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
      <Row>
        <Col xs={4}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={
              <FormattedMessage id="ui-serials-management.ruleset.startDate" />
            }
            name="startDate"
            required
            usePortal
            validate={requiredValidator}
          />
        </Col>
        {allowCreation && (
          <Col xs={8}>
            <Field
              component={TextArea}
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.note" />
              }
              name="note"
            />
          </Col>
        )}
      </Row>
      {!!ruleset?.templateConfig?.rules?.length &&
        renderTemplateStartingValues()}
      {!!predictedPieces && renderPiecesTable()}
    </FormModal>
  );
};

PiecesPreviewModal.propTypes = propTypes;

export default PiecesPreviewModal;
