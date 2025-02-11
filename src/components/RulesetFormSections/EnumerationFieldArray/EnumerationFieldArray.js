import { useCallback, useMemo } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Button, Select, Row, Col } from '@folio/stripes/components';
import {
  EditCard,
  requiredValidator,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata } from '../../utils';

import EnumerationNumericFieldArray from './EnumerationNumericFieldArray';
import EnumerationTextualFieldArray from './EnumerationTextualFieldArray';

const [ENUMERATION_LABEL_FORMAT] = [
  'EnumerationTemplateMetadataRule.TemplateMetadataRuleFormat',
];

const EnumerationFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    'templateConfig.enumerationRules'
  );

  const refdataValues = useSerialsManagementRefdata([ENUMERATION_LABEL_FORMAT]);

  const enumerationOptions = useMemo(() => {
    return selectifyRefdata(refdataValues, ENUMERATION_LABEL_FORMAT, 'value');
  }, [refdataValues]);

  const enumerationSelectorOnChange = useCallback(
    (e, index) => {
      change(`templateConfig.enumerationRules[${index}]`, {
        templateMetadataRuleFormat: e?.target?.value,
        ruleFormat: {
          levels: [{}],
        },
      });
    },
    [change]
  );

  const renderLabelRule = (templateConfig, index) => {
    // Using indexCount to prevent sonarlint from flagging this as an issue
    const indexKey = index;

    return (
      <EditCard
        key={`label-rule-card-${indexKey}`}
        data-testid="editCard"
        deleteButtonTooltipText={
          <FormattedMessage
            id="ui-serials-management.ruleset.removeEnumerationLabel"
            values={{ index: index + 1 }}
          />
        }
        header={
          <>
            <FormattedMessage
              id="ui-serials-management.ruleset.enumerationLabelIndex"
              values={{ index: index + 1 }}
            />
          </>
        }
        onDelete={() => onDeleteField(index, templateConfig)}
      >
        <Row>
          <Col xs={3}>
            <Field
              name={`templateConfig.enumerationRules[${index}].templateMetadataRuleFormat`}
              render={({ input, meta }) => {
                return (
                  <Select
                    dataOptions={[
                      { value: '', label: '' },
                      ...enumerationOptions,
                    ]}
                    input={input}
                    label={
                      <FormattedMessage id="ui-serials-management.ruleset.enumerationFormat" />
                    }
                    meta={meta}
                    onChange={(e) => enumerationSelectorOnChange(e, index)}
                    required
                  />
                );
              }}
              validate={requiredValidator}
            />
          </Col>
        </Row>
        {/*
        Previously discussed that this could maybe be a switch, as it stands I think its fine
        If we end up expanding the enumeration options, then its something to reconsider
        */}
        {values?.templateConfig?.enumerationRules[index]
          ?.templateMetadataRuleFormat === 'enumeration_numeric' && (
          <>
            <EnumerationNumericFieldArray
              index={index}
              name={`templateConfig.enumerationRules[${index}].ruleFormat`}
            />
          </>
        )}
        {values?.templateConfig?.enumerationRules[index]
          ?.templateMetadataRuleFormat === 'enumeration_textual' && (
          <>
            <EnumerationTextualFieldArray
              index={index}
              name={`templateConfig.enumerationRules[${index}].ruleFormat`}
            />
          </>
        )}
      </EditCard>
    );
  };

  return (
    <>
      <FieldArray name="templateConfig.rules">
        {() => items.map((enumerationRule, index) => {
          return renderLabelRule(enumerationRule, index);
        })
        }
      </FieldArray>
      {!values?.templateConfig?.enumerationRules?.length > 0 && (
        <>
          <div>
            <FormattedMessage id="ui-serials-management.ruleset.noEnumerationLabels" />
          </div>
          <br />
        </>
      )}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addEnumerationLabel" />
      </Button>
    </>
  );
};

export default EnumerationFieldArray;
