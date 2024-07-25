import PropTypes from 'prop-types';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Datepicker,
  Row,
  Col,
  Label,
  TextField,
  Layout,
  TextArea,
  Select,
} from '@folio/stripes/components';

import {
  composeValidators,
  requiredValidator,
} from '@folio/stripes-erm-components';

import { validateWithinRange } from '../utils';

import css from './PiecesPreviewModal.css';

const propTypes = {
  ruleset: PropTypes.object,
  pieceSets: PropTypes.arrayOf(PropTypes.object),
  allowCreation: PropTypes.bool,
};

// TODO Definitely needs to be refactored at some point, additionall will need to be moved elsewhere
const PiecesPreviewModalForm = ({
  ruleset,
  pieceSets,
  allowCreation = false,
}) => {
  const { change } = useForm();
  const intl = useIntl();

  const startingValueDataOptions = pieceSets
    ?.filter((ps) => ps?.ruleset?.id === ruleset?.id)
    ?.map((fps) => {
      return {
        value: fps?.id,
        label: `${intl.formatMessage({ id: 'ui-serials-management.pieceSets.publicationDate' })}: 
                ${intl.formatDate(fps?.nextPieceTemplateMetadata?.standard?.date)}, 
                ${intl.formatMessage({ id: 'ui-serials-management.pieceSets.dateGenerated' })}: 
                ${intl.formatDate(fps?.dateCreated)} ${intl.formatTime(fps?.dateCreated)} `,
      };
    });

  const handleStartingValuesChange = (e) => {
    const selectedNextPiece = pieceSets?.find(
      (ps) => ps.id === e?.target?.value || ''
    );
    change({
      startDate: selectedNextPiece?.nextPieceTemplateMetadata?.standard?.date,
      startingValues: selectedNextPiece?.nextPieceTemplateMetadata?.userConfigured?.map(
        (uc) => {
          if (uc?.metadataType?.levels?.length) {
            return {
              levels: uc?.metadataType?.levels?.map((ucl) => {
                return { value: ucl?.rawValue };
              }),
            };
          }
          return null;
        }
      )
    });
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
                name={`startingValues[${index}].levels[${i}].value`}
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

  return (
    <>
      {!!startingValueDataOptions?.length && (
        <Row>
          <Col xs={12}>
            <Select
              dataOptions={[
                { value: '', label: '' },
                ...startingValueDataOptions,
              ]}
              label={
                <FormattedMessage id="ui-serials-management.ruleset.followOnFromPrevious" />
              }
              onChange={(e) => handleStartingValuesChange(e)}
            />
          </Col>
        </Row>
      )}
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
        (e) => e?.ruleType?.templateMetadataRuleFormat?.value ===
            'enumeration_numeric' ||
          e?.ruleType?.templateMetadataRuleFormat === 'enumeration_numeric'
      ) && renderTemplateStartingValues()}
    </>
  );
};

PiecesPreviewModalForm.propTypes = propTypes;

export default PiecesPreviewModalForm;
