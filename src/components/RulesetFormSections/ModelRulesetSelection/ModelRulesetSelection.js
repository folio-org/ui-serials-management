import { useState } from 'react';
import { useForm, useFormState } from 'react-final-form';
import { useIntl } from 'react-intl';

import { Col, InfoPopover, Row } from '@folio/stripes/components';

import { generateKiwtQuery, QueryTypedown } from '@k-int/stripes-kint-components';

import { MODEL_RULESETS_ENDPOINT } from '../../../constants/endpoints';
import { getRulesetFormValues } from '../../utils';

const ModelRulesetSelection = () => {
  const intl = useIntl();
  const { change } = useForm();
  const { values, initialValues } = useFormState();

  const [selectedModelRuleset, setSelectedModelRuleset] = useState();

  const handleModelRulesetChange = (selectedRuleset) => {
    Object.keys(values).forEach(key => {
      change(key, 'undefined');
    });

    setSelectedModelRuleset(selectedRuleset);

    if (selectedRuleset?.serialRuleset) {
      const formattedValues = getRulesetFormValues(selectedRuleset.serialRuleset);

      Object.keys(formattedValues).forEach(key => {
        change(key, formattedValues[key]);
      });
    } else {
      Object.keys(initialValues).forEach(key => {
        change(key, initialValues[key]);
      });
    }
  };

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'name,description,exampleLabel',
        stats: false,
        sort: [{ path: 'name' }],
      },
      {
        query: input || '',
      }
    );
    return `${path}${query}`;
  };

  const renderListItem = (item) => {
    return (
      <span>
        <strong>{item.name}</strong> &quot;{item.description}&quot; <i>{item.exampleLabel}</i>
      </span>
    );
  };

  return (
    <Row>
      <Col xs={9}>
        <QueryTypedown
          id="model-ruleset-typedown"
          input={{
            name: 'model-ruleset-typedown',
            // onChange: (rs) => setSelectedModelRuleset(rs),
            onChange: handleModelRulesetChange,
            value: selectedModelRuleset
          }}
          label={
            <>
              {intl.formatMessage({ id: 'ui-serials-management.patternTemplate' })}
              <InfoPopover
                content={intl.formatMessage({ id: 'ui-serials-management.patternTemplatePopover' })}
              />
            </>
          }
          path={MODEL_RULESETS_ENDPOINT}
          pathMutator={pathMutator}
          renderListItem={renderListItem}
        />
      </Col>
    </Row>
  );
};

export default ModelRulesetSelection;
