import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { NumberField } from '@k-int/stripes-kint-components';

import {
  Row,
  Col,
  Select,
  TextField,
  IconButton,
} from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import { ENUMERATION_NUMBER_FORMAT } from '../../../../../constants/selectOptionTranslations';
import { validateWholeNumber, useSerialsManagementRefdata } from '../../../../utils';

const [ENUMERATION_FORMAT, ENUMERATION_SEQUENCE] = [
  'EnumerationNumericLevelTMRF.Format',
  'EnumerationNumericLevelTMRF.Sequence',
];

const EnumerationNumericField = ({
  items,
  name,
  index,
  level,
  onDeleteField,
}) => {
  const intl = useIntl();
  const refdataValues = useSerialsManagementRefdata([
    ENUMERATION_FORMAT,
    ENUMERATION_SEQUENCE,
  ]);

  // Extract the card index from the name prop
  const cardIndexMatch = name.match(/enumerationRules\[(\d+)\]/);
  const cardIndex = cardIndexMatch ? cardIndexMatch[1] : '0';

  return (
    <Row>
      <Col xs={1}>{index + 1}</Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.numberOfUnits">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={NumberField}
              name={`${name}.units`}
              required
              validate={composeValidators(
                requiredValidator,
                validateWholeNumber
              )}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.format">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={Select}
              dataOptions={[
                { value: '', label: '' },
                ...ENUMERATION_NUMBER_FORMAT.map(
                  (o) => {
                    return {
                      value: o?.value,
                      label: intl.formatMessage({ id: o?.id }),
                    };
                  }
                ),
              ]}
              id={`format-value-select-card-${cardIndex}-level-${index}`}
              name={`${name}.format.value`}
              required
              validate={requiredValidator}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.sequence">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={Select}
              dataOptions={[
                { value: '', label: '' },
                ...selectifyRefdata(
                  refdataValues,
                  ENUMERATION_SEQUENCE,
                  'value'
                ),
              ]}
              id={`sequence-value-select-card-${cardIndex}-level-${index}`}
              name={`${name}.sequence.value`}
              required
              validate={requiredValidator}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={3}>
        <FormattedMessage id="ui-serials-management.ruleset.internalNote">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={TextField}
              id={`internal-note-card-${cardIndex}-level-${index}`}
              name={`${name}.internalNote`}
            />
          )}
        </FormattedMessage>
      </Col>
      {items?.length > 1 && (
        <Col xs={2}>
          <IconButton
            icon="trash"
            onClick={() => onDeleteField(index, level)}
          />
        </Col>
      )}
    </Row>
  );
};

EnumerationNumericField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  index: PropTypes.number,
  level: PropTypes.object,
  onDeleteField: PropTypes.func,
};

export default EnumerationNumericField;
