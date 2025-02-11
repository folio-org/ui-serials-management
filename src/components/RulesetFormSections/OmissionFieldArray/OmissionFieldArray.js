import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Select,
  Row,
  Col,
  Tooltip,
  InfoPopover,
} from '@folio/stripes/components';
import {
  EditCard,
  requiredValidator,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata } from '../../utils';

import { SORTED_OMISSION_TIME_UNITS } from '../../../constants/sortedArrays';

import OmissionField from './OmissionField';

const [TIME_UNITS] = ['OmissionRule.TimeUnits'];

const OmissionFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { items, onAddField, onDeleteField } =
    useKiwtFieldArray('omission.rules');
  const refdataValues = useSerialsManagementRefdata([TIME_UNITS]);
  const renderAddOmissionButton = () => {
    if (values?.combination) {
      return (
        <Tooltip
          id="add-omission-button-disabled-tooltip"
          placement="bottom-start"
          text={
            <FormattedMessage id="ui-serials-management.ruleset.addOmissionDisabledTooltip" />
          }
        >
          {({ ref, ariaIds }) => (
            <div
              ref={ref}
              aria-describedby={ariaIds.sub}
              aria-labelledby={ariaIds.text}
            >
              <Button disabled>
                <FormattedMessage id="ui-serials-management.ruleset.addOmission" />
              </Button>
            </div>
          )}
        </Tooltip>
      );
    } else {
      return (
        <Button onClick={() => onAddField({})}>
          <FormattedMessage id="ui-serials-management.ruleset.addOmission" />
        </Button>
      );
    }
  };

  const renderOmissionRule = (omission, index) => {
    return (
      <EditCard
        key={`omission-rule-card-${omission}-${index}`}
        deleteButtonTooltipText={
          <FormattedMessage
            id="ui-serials-management.ruleset.removeOmissionRule"
            values={{ index: index + 1 }}
          />
        }
        header={
          <>
            <FormattedMessage
              id="ui-serials-management.ruleset.omissionRuleIndex"
              values={{ index: index + 1 }}
            />
            <InfoPopover
              content={
                <FormattedMessage
                  id="ui-serials-management.ruleset.omissionRulesPopover"
                  values={{
                    br: <br />,
                  }}
                />
              }
            />
          </>
        }
        onDelete={() => onDeleteField(index, omission)}
      >
        <Row>
          <Col xs={3}>
            <Field
              name={`omission.rules[${index}].timeUnit.value`}
              render={({ input, meta }) => (
                <Select
                  dataOptions={[
                    { value: '', label: '' },
                    ...selectifyRefdata(
                      refdataValues,
                      TIME_UNITS,
                      'value'
                    ).sort((a, b) => {
                      return (
                        SORTED_OMISSION_TIME_UNITS.indexOf(a.value) -
                        SORTED_OMISSION_TIME_UNITS.indexOf(b.value)
                      );
                    }),
                  ]}
                  input={input}
                  label={
                    <FormattedMessage id="ui-serials-management.ruleset.timeUnit" />
                  }
                  meta={meta}
                  onChange={(e) => change(`omission.rules[${index}]`, {
                    timeUnit: { value: e?.target?.value },
                  })
                  }
                  required
                />
              )}
              validate={requiredValidator}
            />
          </Col>
        </Row>
        {values?.omission?.rules[index]?.timeUnit && (
          <OmissionField
            index={index}
            name="omission.rules"
            omission={omission}
          />
        )}
      </EditCard>
    );
  };

  return (
    <>
      <FieldArray name="omission.rules">
        {() => items.map((omission, index) => {
          return renderOmissionRule(omission, index);
        })
        }
      </FieldArray>
      {!values?.omission && (
        <>
          <div>
            <FormattedMessage id="ui-serials-management.ruleset.noOmissionRules" />
          </div>
          <br />
        </>
      )}
      {renderAddOmissionButton()}
    </>
  );
};

export default OmissionFieldArray;
