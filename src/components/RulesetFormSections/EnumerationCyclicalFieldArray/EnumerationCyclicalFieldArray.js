import PropTypes from 'prop-types';

import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button, Label, Row, Col } from '@folio/stripes/components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';


import EnumerationCyclicalField from '../EnumerationCyclicalField';

const EnumerationCyclicalFieldArray = ({ name }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    `${name}.levels`
  );

  return (
    <>
      <Row>
        <Col xs={1}>
          <Label>
            <FormattedMessage id="ui-serials-management.ruleset.level" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label required>
            <FormattedMessage id="ui-serials-management.ruleset.unitsPerCycle" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label required>
            <FormattedMessage id="ui-serials-management.ruleset.value" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label>
            <FormattedMessage id="ui-serials-management.ruleset.internalNote" />
          </Label>
        </Col>
      </Row>
      <FieldArray name={`${name}.levels`}>
        {() => items?.map((level, index) => {
          return (
            <EnumerationCyclicalField
              index={index}
              items={items}
              level={level}
              name={`${name}.levels[${index}]`}
              onDeleteField={onDeleteField}
            />
          );
        })
        }
      </FieldArray>
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addLevel" />
      </Button>
    </>
  );
};

EnumerationCyclicalFieldArray.propTypes = {
  name: PropTypes.string,
};

export default EnumerationCyclicalFieldArray;
