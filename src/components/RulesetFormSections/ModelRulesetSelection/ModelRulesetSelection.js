import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, InfoPopover, Row } from '@folio/stripes/components';

import { generateKiwtQuery, QueryTypedown } from '@k-int/stripes-kint-components';

import { MODEL_RULESETS_ENDPOINT } from '../../../constants/endpoints';

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedModelRuleset: PropTypes.object.isRequired
};

const ModelRulesetSelection = ({ onSelect, selectedModelRuleset }) => {
  const intl = useIntl();

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
            onChange: rs => onSelect(rs),
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
          // test will fail if renderFooter is not provided
          renderFooter={() => true}
          renderListItem={renderListItem}
        />
      </Col>
    </Row>
  );
};

ModelRulesetSelection.propTypes = propTypes;

export default ModelRulesetSelection;
