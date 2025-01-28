import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Button, Select, Row, Col, Selection } from '@folio/stripes/components';
import {
  EditCard,
  requiredValidator,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata } from '../../utils';

import ChronologyField from '../ChronologyField';
import { useLocales } from '../../../hooks';

const [CHRONOLOGY_LABEL_FORMAT] = [
  'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
];

const ChronologyFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { data: locales } = useLocales();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    'templateConfig.chronologyRules'
  );

  const refdataValues = useSerialsManagementRefdata([CHRONOLOGY_LABEL_FORMAT]);

  const filterSelectValues = (value, dataOptions) => {
    const regex = new RegExp(value, 'i');

    return dataOptions.filter(({ label }) => label.search(regex) !== -1);
  };

  const renderLabelRule = (chronologyRule, index) => {
    // Using indexCount to prevent sonarlint from flagging this as an issue
    const indexKey = index;

    return (
      <EditCard
        key={`label-rule-card-${indexKey}`}
        data-testid="editCard"
        deleteButtonTooltipText={
          <FormattedMessage
            id="ui-serials-management.ruleset.removeChronologyLabelIndex"
            values={{ index: index + 1 }}
          />
        }
        header={
          <>
            <FormattedMessage
              id="ui-serials-management.ruleset.chronologyLabelIndex"
              values={{ index: index + 1 }}
            />
          </>
        }
        onDelete={() => onDeleteField(index, chronologyRule)}
      >
        <Row>
          <>
            <Col xs={3}>
              <Field
                name={`templateConfig.chronologyRules[${index}].templateMetadataRuleFormat`}
                render={({ input, meta }) => {
                  const selectedDataOptions = selectifyRefdata(
                    refdataValues,
                    CHRONOLOGY_LABEL_FORMAT,
                    'value'
                  );
                  return (
                    <Select
                      dataOptions={[
                        { value: '', label: '' },
                        ...selectedDataOptions,
                      ]}
                      input={input}
                      label={
                        <FormattedMessage id="ui-serials-management.ruleset.chronologyFormat" />
                      }
                      meta={meta}
                      onChange={(e) => {
                        change(
                          `templateConfig.chronologyRules[${index}].templateMetadataRuleFormat`,
                          e?.target?.value
                        );
                        change(
                          `templateConfig.chronologyRules[${index}].ruleFormat`,
                          undefined
                        );
                      }}
                      required
                    />
                  );
                }}
                validate={requiredValidator}
              />
            </Col>

            <Col xs={3}>
              <Field
                component={Selection}
                dataOptions={locales}
                initialValue="en"
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.chronology.locale" />
                }
                name={`templateConfig.chronologyRules[${index}].ruleLocale`}
                onFilter={filterSelectValues}
                parse={(v) => v}
                required
                validate={requiredValidator}
              />
            </Col>
          </>
        </Row>
        {values?.templateConfig?.chronologyRules[index]
          ?.templateMetadataRuleFormat && (
          <ChronologyField
            chronologyRule={chronologyRule}
            index={index}
            name={`templateConfig.chronologyRules[${index}].ruleFormat`}
          />
        )}
      </EditCard>
    );
  };

  return (
    <>
      <FieldArray name="templateConfig.chronologyRules">
        {() => items.map((chronologyRule, index) => {
          return renderLabelRule(chronologyRule, index);
        })
        }
      </FieldArray>
      {!values?.templateConfig?.chronologyRules?.length > 0 && (
        <>
          <div>
            <FormattedMessage id="ui-serials-management.ruleset.noChronologyLabels" />
          </div>
          <br />
        </>
      )}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addChronologyLabel" />
      </Button>
    </>
  );
};

export default ChronologyFieldArray;
