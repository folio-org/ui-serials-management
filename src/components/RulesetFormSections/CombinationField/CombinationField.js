import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useForm } from 'react-final-form';

import {
  Select,
  Col,
  TextField,
  Row,
  Label,
  InfoPopover,
} from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import {
  SORTED_MONTHS,
  SORTED_WEEKDAYS,
} from '../../../constants/sortedArrays';

import {
  validateWithinRange,
  validateWholeNumber,
  useSerialsManagementRefdata,
} from '../../utils';

import { OMISSION_COMBINATION_PATTERN_TYPES } from '../../../constants/patternTypes';

const [MONTHS, WEEKDAYS] = ['Global.Month', 'Global.Weekday'];

const CombinationField = ({ name, index, combination }) => {
  const intl = useIntl();
  const { change } = useForm();
  const refdataValues = useSerialsManagementRefdata([MONTHS, WEEKDAYS]);

  const validateNumberOfIssues = (value) => {
    if (value) {
      if (value < 2) {
        return (
          <FormattedMessage id="ui-serials-management.validate.greaterThanOne" />
        );
      }
    }
    return undefined;
  };

  const renderIssueField = () => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.ruleset.issue" />}
        name={`${name}[${index}].pattern.issue`}
        required
        type="number"
        validate={composeValidators(requiredValidator, validateWholeNumber)}
      />
    );
  };

  const renderDayField = (minValue, maxValue) => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.ruleset.day" />}
        name={`${name}[${index}].pattern.day`}
        required
        type="number"
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue),
          validateWholeNumber
        )}
      />
    );
  };

  const renderMonthField = (labelId) => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, MONTHS, 'value').sort((a, b) => {
            return (
              SORTED_MONTHS.indexOf(a.value) - SORTED_MONTHS.indexOf(b.value)
            );
          }),
        ]}
        label={
          <FormattedMessage id={`ui-serials-management.ruleset.${labelId}`} />
        }
        name={`${name}[${index}].pattern.month.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekField = (minValue, maxValue, labelId) => {
    const dataOptions = [];
    for (let i = minValue; i <= maxValue; i++) {
      dataOptions.push({ value: i, label: i });
    }

    return (
      <Field
        component={Select}
        dataOptions={[{ value: '', label: '' }, ...dataOptions]}
        label={
          <FormattedMessage id={`ui-serials-management.ruleset.${labelId}`} />
        }
        name={`${name}[${index}].pattern.week`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekdayField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, WEEKDAYS, 'value').sort((a, b) => {
            return (
              SORTED_WEEKDAYS.indexOf(a.value) -
              SORTED_WEEKDAYS.indexOf(b.value)
            );
          }),
        ]}
        label={<FormattedMessage id="ui-serials-management.ruleset.weekday" />}
        name={`${name}[${index}].pattern.weekday.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const patternTypeFormats = {
    day_month: {
      fields: [renderDayField(1, 31), renderMonthField('ofMonth')],
    },
    day_week: {
      fields: [renderWeekdayField(), renderWeekField(1, 52, 'inWeek')],
    },
    day_week_month: {
      fields: [
        renderWeekdayField(),
        renderWeekField(1, 4, 'inWeek'),
        renderMonthField('ofMonth'),
      ],
    },
    day: {
      fields: [renderDayField(1, 31)],
    },
    day_weekday: {
      fields: [renderWeekdayField()],
    },
    week: {
      fields: [renderWeekField(1, 52, 'week')],
    },
    week_month: {
      fields: [renderWeekField(1, 4, 'week'), renderMonthField('ofMonth')],
    },
    month: {
      fields: [renderMonthField('month')],
    },
    issue: {
      fields: [renderIssueField()],
    },
    issue_week: {
      fields: [renderIssueField(), renderWeekField(1, 52, 'inWeek')],
    },
    issue_week_month: {
      fields: [
        renderIssueField(),
        renderWeekField(1, 4, 'inWeek'),
        renderMonthField('ofMonth'),
      ],
    },
    issue_month: {
      fields: [renderIssueField(), renderMonthField('ofMonth')],
    },
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <Label tagName="h4">
            <FormattedMessage id="ui-serials-management.ruleset.firstIssue" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-serials-management.ruleset.firstIssuePopover" />
              }
              id="retrospective-oa-tooltip"
            />
          </Label>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { label: '', value: '' },
              ...OMISSION_COMBINATION_PATTERN_TYPES[combination?.timeUnit?.value].map(
                (e) => {
                  return {
                    value: e?.value,
                    label: e?.labels
                      ?.map((l) => intl.formatMessage({ id: l?.id }))
                      ?.join(', '),
                  };
                }
              ),
            ]}
            label={
              <FormattedMessage id="ui-serials-management.ruleset.combinationRuleType" />
            }
            name={`${name}[${index}].patternType`}
            onChange={(e) => change(`${name}[${index}]`, {
              timeUnit: { value: combination?.timeUnit?.value },
              patternType: e?.target?.value,
            })
            }
            required
            validate={requiredValidator}
          />
        </Col>
        {patternTypeFormats[combination?.patternType]?.fields?.map((combinationField, i) => {
          return <Col key={`combination-field-${name}-${i}`} xs={3}>{combinationField}</Col>;
        })}
      </Row>
      {combination?.patternType && (
        <Row>
          <Col xs={3}>
            <Field
              component={TextField}
              id="total-number-of-issues-to-combine"
              label={
                <FormattedMessage id="ui-serials-management.ruleset.totalNumberOfIssuesToCombine" />
              }
              name={`${name}[${index}].issuesToCombine`}
              required
              type="number"
              validate={composeValidators(
                requiredValidator,
                validateWholeNumber,
                validateNumberOfIssues
              )}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

CombinationField.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  combination: PropTypes.object,
};

export default CombinationField;
