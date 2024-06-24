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
  Label,
  TextField,
  Layout,
  TextArea,
} from '@folio/stripes/components';

import {
  composeValidators,
  requiredValidator,
} from '@folio/stripes-erm-components';

import { urls, validateWithinRange } from '../utils';

import css from './PiecesPreviewModal.css';

import {
  CREATE_PREDICTED_PIECES,
  GENERATE_PIECES_PREVIEW,
} from '../../constants/endpoints';
import PiecePublicationDate from '../PiecePublicationDate';

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
  /* istanbul ignore next */
  const closeModal = () => {
    setShowModal(false);
    setPredictedPieces(null);
  };

  const { mutateAsync: generatePieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'generatePieces'],
    (data) =>
      ky
        .post(GENERATE_PIECES_PREVIEW, { json: data })
        .json()
        .then((res) => setPredictedPieces(res))
  );

  // istanbul ignore next
  const { mutateAsync: createPieces } = useMutation(
    ['ui-serials-management', 'PiecesPreviewModal', 'createPieces'],
    (data) =>
      ky
        .post(CREATE_PREDICTED_PIECES, { json: data })
        .json()
        .then((res) => history.push(urls.pieceSetView(res?.id)))
  );

  // istanbul ignore next
  const handleCreation = async (values) => {
    const submitValues = {
      ...ruleset,
      startDate: values?.startDate,
      note: values?.note,
      startingValues: values?.startingValues,
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
      startingValues: values?.startingValues,
    };
    // await generatePieces(submitValues);
  };

  // "userConfigured": [
  //           {
  //               "id": "160263bc-fa18-42ab-8966-aedc4987b1b5",
  //               "index": 1,
  //               "userConfiguredTemplateMetadataType": {
  //                   "id": "ff8081819035747e01903575b3470047"
  //               },
  //               "metadataType": {
  //                   "id": "9fea6fba-00f0-4fea-9447-5f95b6245013",
  //                   "levels": [
  //                       {
  //                           "id": "b9ac804e-56fc-42ae-8cd6-54ea8c68fe0f"
  //                       },
  //                       {
  //                           "id": "79ea4759-7c3e-4aca-b27a-34e6259ed6de"
  //                       }
  //                   ]
  //               }
  //           },
  //           {
  //               "id": "8e17848a-643e-48a4-af46-0a55e81a41d2",
  //               "index": 0,
  //               "userConfiguredTemplateMetadataType": {
  //                   "id": "ff8081819035747e01903575b3430046"
  //               },
  //               "metadataType": {
  //                   "id": "f5be7ff2-e375-4a28-be8d-b94bd42e12c0",
  //                   "monthDay": "1",
  //                   "month": "November",
  //                   "weekday": "Friday",
  //                   "year": "2024"
  //               }
  //           }
  //       ],
  //       "standard": {
  //           "id": "eb32236f-07ee-4efc-9ea6-4e482eca632d",
  //           "index": 12,
  //           "containedIndices": [
  //               12
  //           ],
  //           "date": "2024-11-01",
  //           "naiveIndex": 12
  //       }
  //   },

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

  const renderEnumerationNumericField = (formatValues, index) => {
    return (
      <Row key={`enumeration-numeric-field-${index}`}>
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
            <Col key={`${index}-${i}`} xs={2}>
              <Field
                component={TextField}
                id="level-index-label"
                label={
                  <FormattedMessage
                    id="ui-serials-management.ruleset.levelIndex"
                    values={{ index: i + 1 }}
                  />
                }
                name={`startingValues[${index}].metadataType.levels[${i}].value`}
                required
                type="number"
                validate={
                  e?.sequence?.value === 'reset'
                    ? composeValidators(
                        requiredValidator,
                        validateWithinRange(1, e?.units)
                      )
                    : requiredValidator
                }
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  const renderTemplateStartingValues = () => {
    return (
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
            // Required so that sonarcloud doesnt flag use of index within key prop
            const indexCounter = i;
            return (
              <div key={`enumeration-numeric-field-container-${indexCounter}`}>
                {renderEnumerationNumericField(e, i)}
                <br />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting, values } = formState;
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
              onClick={handleSubmit}
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

  const getInitialValues = () => {
    return {
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
    };
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
        initialValues: { ...getInitialValues() },
      }}
      mutators={arrayMutators}
      onSubmit={handleCreation}
    >
      <Row>
        <Col xs={4}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            id="ruleset-start-date"
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
      {!!ruleset?.templateConfig?.rules?.some(
        (e) =>
          e?.ruleType?.templateMetadataRuleFormat?.value ===
            'enumeration_numeric' ||
          e?.ruleType?.templateMetadataRuleFormat === 'enumeration_numeric'
      ) && renderTemplateStartingValues()}
      {!!predictedPieces && renderPiecesTable()}
    </FormModal>
  );
};

PiecesPreviewModal.propTypes = propTypes;

export default PiecesPreviewModal;
