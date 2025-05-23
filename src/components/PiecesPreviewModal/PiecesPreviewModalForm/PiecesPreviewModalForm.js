import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field, useForm, useFormState } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Datepicker,
  Row,
  Col,
  InfoPopover,
  Label,
  TextField,
  Layout,
  TextArea,
  Select,
  MessageBanner,
} from '@folio/stripes/components';

import { NumberField } from '@k-int/stripes-kint-components';

import {
  composeValidators,
  requiredValidator,
} from '@folio/stripes-erm-components';

import { validateNotNegative, validateWithinRange } from '../../utils';

import css from './PiecesPreviewModalForm.css';

const propTypes = {
  serialName: PropTypes.string,
  ruleset: PropTypes.object,
  existingPieceSets: PropTypes.arrayOf(PropTypes.object),
  allowCreation: PropTypes.bool,
};

// TODO Definitely needs to be refactored at some point, additionally will need to be moved elsewhere
const PiecesPreviewModalForm = ({
  serialName,
  ruleset,
  existingPieceSets,
  allowCreation = false,
}) => {
  const { values } = useFormState();
  const { change, batch } = useForm();
  const intl = useIntl();

  const maxAllowedCycles = useMemo(() => {
    const TIME_UNIT_PER_YEAR = {
      day: 365.2425,
      week: 52.1775,
      month: 12,
    };

    const MAX_PIECES = 366;

    const { issues, period, timeUnit } = ruleset?.recurrence ?? {};

    if (timeUnit?.value === 'year') {
      return Math.floor(MAX_PIECES / issues);
    } else {
      return Math.floor(
        MAX_PIECES / ((TIME_UNIT_PER_YEAR[timeUnit?.value] / period) * issues)
      );
    }
  }, [ruleset]);

  // Copied across from mod-serials PieceGenerationService for calculating minNumberOfYears
  const minimumNumberOfYears = useMemo(() => {
    const TIME_UNIT_DAY_AMOUNT = {
      day: 1,
      week: 7,
      month: 31,
      year: 365,
    };

    // Calculate minimum whole number of years
    // Time unit * period / 365 - rounded up to next whole number
    return Math.ceil(
      (TIME_UNIT_DAY_AMOUNT[ruleset?.recurrence?.timeUnit?.value] *
        ruleset?.recurrence?.period) /
        365
    );
  }, [ruleset?.recurrence?.period, ruleset?.recurrence?.timeUnit?.value]);

  const getAdjustedStartDate = useCallback(
    (date, numberOfCycles = 1) => {
      const adjustedStartDate = new Date(date);
      adjustedStartDate.setFullYear(
        adjustedStartDate.getFullYear() + minimumNumberOfYears * numberOfCycles
      );
      return adjustedStartDate;
    },
    [minimumNumberOfYears]
  );

  const startingValueDataOptions = existingPieceSets
    ?.filter((ps) => ps?.ruleset?.id === ruleset?.id)
    ?.map((fps) => {
      return {
        value: fps?.id,
        label: `${intl.formatMessage({ id: 'ui-serials-management.pieceSets.publicationDate' })}:
                ${intl.formatDate(getAdjustedStartDate(fps?.startDate, fps?.numberOfCycles ?? 1), { timeZone: 'UTC' })},
                ${intl.formatMessage({ id: 'ui-serials-management.pieceSets.dateGenerated' })}:
                ${intl.formatDate(fps?.dateCreated)} ${intl.formatTime(fps?.dateCreated)} `,
      };
    });

  // Seperated out due to sonarcloud code smells
  const formatUserConfiguredMetadata = (userConfiguredMetadata = []) => {
    return userConfiguredMetadata
      .filter((uc) => uc?.metadataType?.levels?.length)
      .map((uc) => {
        return {
          levels: uc?.metadataType?.levels?.map((ucl) => {
            return { rawValue: ucl?.rawValue };
          }),
        };
      });
  };

  const handleStartingValuesChange = useCallback(
    (e) => {
      const selectedPieceSet = existingPieceSets?.find(
        (ps) => ps.id === e?.target?.value || ''
      );
      batch(() => {
        change(
          'startDate',
          selectedPieceSet?.startDate
            ? getAdjustedStartDate(
              selectedPieceSet?.startDate,
              selectedPieceSet?.numberOfCycles ?? 1
            )
            : null
        );
        change('numberOfCycles', selectedPieceSet?.numberOfCycles ?? 1);
        change(
          'startingValues',
          formatUserConfiguredMetadata(
            selectedPieceSet?.continuationPieceRecurrenceMetadata
              ?.userConfigured
          )
        );
      });
    },
    [batch, change, existingPieceSets, getAdjustedStartDate]
  );

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
        {formatValues?.ruleFormat?.levels?.map((e, i) => {
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
                name={`startingValues[${index}].levels[${i}].rawValue`}
                required
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
        {ruleset?.templateConfig?.enumerationRules?.map((e, i) => {
          if (
            e?.templateMetadataRuleFormat?.value === 'enumeration_numeric' ||
            e?.templateMetadataRuleFormat === 'enumeration_numeric'
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
      {startingValueDataOptions?.length > 0 && (
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
            timeZone="UTC"
            usePortal
            validate={requiredValidator}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={NumberField}
            id="number-of-cycles"
            label={
              <>
                <FormattedMessage id="ui-serials-management.ruleset.numberOfCycles" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-serials-management.numberOfCycles.infoPopover" />
                  }
                />
              </>
            }
            name="numberOfCycles"
            required
            validate={composeValidators(
              requiredValidator,
              validateNotNegative,
              validateWithinRange(
                1,
                maxAllowedCycles,
                <FormattedMessage
                  id="ui-serials-management.validate.allowedCycles"
                  values={{ maxValue: maxAllowedCycles }}
                />
              )
            )}
          />
        </Col>
      </Row>
      <Row>
        {allowCreation && (
          <Col xs={12}>
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
      {ruleset?.templateConfig?.enumerationRules?.some(
        (e) => e?.templateMetadataRuleFormat?.value === 'enumeration_numeric' ||
          e?.templateMetadataRuleFormat === 'enumeration_numeric'
      ) && renderTemplateStartingValues()}
      {existingPieceSets?.some((ps) => ps?.startDate === values?.startDate) && (
        <MessageBanner type="warning">
          <FormattedMessage
            id="ui-serials-management.pieceSets.overlappingDates.warning"
            values={{
              startDate: intl.formatDate(values?.startDate, {
                timeZone: 'UTC',
              }),
              serialName,
            }}
          />
        </MessageBanner>
      )}
    </>
  );
};

PiecesPreviewModalForm.propTypes = propTypes;

export default PiecesPreviewModalForm;
