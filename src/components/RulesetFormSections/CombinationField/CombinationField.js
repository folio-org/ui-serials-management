import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';

import { Select, Col, TextField, Row } from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';

import {
  SORTED_MONTHS,
  SORTED_WEEKDAYS,
} from '../../../constants/sortedArrays';

import {
  validateWithinRange,
  validateWholeNumber,
  useSerialsManagementRefdata,
  selectifyRefdata,
} from '../../utils';

const [MONTHS, WEEKDAYS, COMBINATION_PATTERN_TYPES] = [
  'Global.Month',
  'Global.Weekday',
  'CombinationRule.PatternType',
];

const CombinationField = ({ name, index, combination }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const refdataValues = useSerialsManagementRefdata([
    MONTHS,
    WEEKDAYS,
    COMBINATION_PATTERN_TYPES,
  ]);

  const renderIssueField = (minValue = 1, maxValue = 1) => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.ruleset.issue" />}
        name={`${name}[${index}].pattern.issue`}
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
        renderToOverlay
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
        renderToOverlay
        required
        validate={requiredValidator}
      />
    );
  };

  const patternTypeFormats = {
    day_in_a_month: {
      fields: [renderDayField(1, 31), renderMonthField('ofMonth')],
    },
    weekday_in_a_week: {
      fields: [renderWeekdayField(), renderWeekField(1, 52, 'inWeek')],
    },
    weekday_in_week_of_a_month: {
      fields: [
        renderWeekdayField(),
        renderWeekField(1, 4, 'inWeek'),
        renderMonthField('ofMonth'),
      ],
    },
    week: {
      fields: [renderWeekField(1, 4, 'week')],
    },
    week_in_a_month: {
      fields: [renderWeekField(1, 4, 'week'), renderMonthField('inMonth')],
    },
    month: {
      fields: [renderMonthField('month')],
    },
    nth_issue: {
      fields: [renderIssueField(1, values?.recurrence?.issues)],
    },
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              ...selectifyRefdata(
                refdataValues,
                COMBINATION_PATTERN_TYPES,
                'value'
              ),
            ]}
            label={
              <FormattedMessage id="ui-serials-management.ruleset.firstIssueType" />
            }
            name={`${name}[${index}].patternType`}
            onChange={(e) => change(`${name}[${index}]`, {
              patternType: e?.target?.value,
            })
            }
            required
            validate={requiredValidator}
          />
        </Col>
        {patternTypeFormats[combination?.patternType]?.fields?.map((e) => {
          return <Col xs={3}>{e}</Col>;
        })}
      </Row>
      {combination?.patternType && (
        <Row>
          <Col xs={3}>
            <Field
              component={TextField}
              label={
                <FormattedMessage id="ui-serials-management.ruleset.numberOfIssuesToCombine" />
              }
              name={`${name}[${index}].issuesToCombine`}
              required
              type="number"
              validate={composeValidators(
                requiredValidator,
                validateWholeNumber
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
  index: PropTypes.string,
  combination: PropTypes.object,
};

export default CombinationField;
