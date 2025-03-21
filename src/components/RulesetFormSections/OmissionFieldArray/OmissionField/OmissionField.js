import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useForm } from 'react-final-form';
import { NumberField } from '@k-int/stripes-kint-components';

import {
  Checkbox,
  Select,
  Col,
  Row,
} from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import {
  SORTED_MONTHS,
  SORTED_WEEKDAYS,
} from '../../../../constants/sortedArrays';

import {
  validateWithinRange,
  validateWholeNumber,
  useSerialsManagementRefdata,
} from '../../../utils';

import { OMISSION_COMBINATION_PATTERN_TYPE_OPTIONS } from '../../../../constants/patternTypeOptions';

const [MONTHS, WEEKDAYS] = ['Global.Month', 'Global.Weekday'];

const OmissionField = ({ name, index, omission }) => {
  const intl = useIntl();
  const { change } = useForm();
  const refdataValues = useSerialsManagementRefdata([
    MONTHS,
    WEEKDAYS
  ]);

  const renderIssueField = () => {
    return (
      <Field
        component={NumberField}
        label={<FormattedMessage id="ui-serials-management.ruleset.issue" />}
        name={`${name}[${index}].pattern.issue`}
        required
        validate={composeValidators(requiredValidator, validateWholeNumber)}
      />
    );
  };

  const renderDayField = (minValue, maxValue) => {
    return (
      <Field
        component={NumberField}
        label={<FormattedMessage id="ui-serials-management.ruleset.day" />}
        name={`${name}[${index}].pattern.day`}
        required
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue),
          validateWholeNumber
        )}
      />
    );
  };

  const renderMonthField = (labelId, fieldName = 'month.value') => {
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
        name={`${name}[${index}].pattern.${fieldName}`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekField = (minValue, maxValue, labelId, fieldName = 'week') => {
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
        name={`${name}[${index}].pattern.${fieldName}`}
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
      fields: [renderWeekdayField(), renderWeekField(1, 53, 'inWeek')],
    },
    day_week_month: {
      fields: [
        renderWeekdayField(),
        renderWeekField(1, 5, 'inWeek'),
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
      fields: [
        renderWeekField(
          1,
          53,
          !omission?.pattern?.isRange ? 'week' : 'weekFrom',
          'weekFrom'
        ),
      ],
      range: [renderWeekField(1, 53, 'weekTo', 'weekTo')],
    },
    week_month: {
      fields: [renderWeekField(1, 5, 'week'), renderMonthField('ofMonth')],
    },
    month: {
      fields: [
        renderMonthField(
          !omission?.pattern?.isRange ? 'month' : 'monthFrom',
          'monthFrom.value'
        ),
      ],
      range: [renderMonthField('monthTo', 'monthTo.value')],
    },
    issue: {
      fields: [renderIssueField()],
    },
    issue_week: {
      fields: [renderIssueField(), renderWeekField(1, 53, 'inWeek')],
    },
    issue_week_month: {
      fields: [
        renderIssueField(),
        renderWeekField(1, 5, 'inWeek'),
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
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { label: '', value: '' },
              ...OMISSION_COMBINATION_PATTERN_TYPE_OPTIONS[
                omission?.timeUnit?.value
              ].map((e) => {
                return {
                  value: e?.value,
                  label: e?.labels
                    ?.map((l) => intl.formatMessage({ id: l?.id }))
                    ?.join(', '),
                };
              }),
            ]}
            label={
              <FormattedMessage id="ui-serials-management.ruleset.omissionRuleType" />
            }
            name={`${name}[${index}].patternType`}
            onChange={(e) => change(`${name}[${index}]`, {
              timeUnit: { value: omission?.timeUnit?.value },
              patternType: e?.target?.value,
            })
            }
            required
            validate={requiredValidator}
          />
        </Col>
        {patternTypeFormats[omission?.patternType]?.fields?.map(
          (omissionField) => {
            return (
              <Col key={`omission-field-${omissionField}`} xs={3}>
                {omissionField}
              </Col>
            );
          }
        )}
      </Row>
      {(omission?.patternType === 'week' ||
        omission?.patternType === 'month') && (
        <Row>
          <Col xs={3}>
            <Field
              component={Checkbox}
              label={
                <FormattedMessage
                  id="ui-serials-management.ruleset.omitRangeOf"
                  values={{ omissionType: `${omission?.patternType}s` }}
                />
              }
              name={`${name}[${index}].pattern.isRange`}
              onChange={(e) => {
                // If isRange checkbox is checked, keep the 'From' value
                if (e.target.checked) {
                  change(`${name}[${index}].pattern`, {
                    ...omission.pattern,
                    isRange: e.target.checked,
                  });
                  // If isRange is unchecked, clear the field for the 'To' value
                } else {
                  change(`${name}[${index}].pattern.isRange`, e.target.checked);
                  change(
                    `${name}[${index}].pattern.${omission?.patternType}To`,
                    undefined
                  );
                }
              }}
              type="checkbox"
            />
          </Col>
          {omission?.pattern?.isRange &&
            patternTypeFormats[omission?.patternType]?.range?.map(
              (omissionField) => {
                return (
                  <Col key={`omission-field-${omissionField}`} xs={3}>
                    {omissionField}
                  </Col>
                );
              }
            )}
        </Row>
      )}
    </>
  );
};

OmissionField.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  omission: PropTypes.object,
};

export default OmissionField;
