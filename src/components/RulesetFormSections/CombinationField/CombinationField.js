import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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

import { useCombinationPatternTypes } from '../../../hooks';

const [MONTHS, WEEKDAYS, COMBINATION_PATTERN_TYPES] = [
  'Global.Month',
  'Global.Weekday',
  'CombinationRule.PatternType',
];

const CombinationField = ({ name, index, combination }) => {
  const { change } = useForm();
  const refdataValues = useSerialsManagementRefdata([
    MONTHS,
    WEEKDAYS,
    COMBINATION_PATTERN_TYPES,
  ]);
  const patternTypes = useCombinationPatternTypes();

  const validateNumberOfIssues = (value) => {
    if (value) {
      if (value < 2) {
        return <FormattedMessage id="ui-serials-management.validate.greaterThanOne" />;
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
            dataOptions={
              patternTypes[combination?.timeUnit?.value] || [
                { label: '', value: '' },
              ]
            }
            la
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
        {patternTypeFormats[combination?.patternType]?.fields?.map((e) => {
          return <Col xs={3}>{e}</Col>;
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
