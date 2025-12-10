import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Row, Col, TextArea, TextField, KeyValue } from '@folio/stripes/components';

import {
  requiredValidator,
  selectifyRefdata,
} from '@folio/stripes-erm-components';
import { useSerialsManagementRefdata } from '../../utils';

const [RULESET_STATUS] = ['ModelRuleset.ModelRulesetStatus'];

const propTypes = {
  nameInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

const TemplateInfoForm = ({ nameInputRef }) => {
  const refdataValues = useSerialsManagementRefdata([RULESET_STATUS]);
  const modelRulesetStatus = selectifyRefdata(refdataValues, RULESET_STATUS, 'value').find(p => p.value === 'active');

  return (
    <>
      <Row>
        <Col xs={9}>
          <Field
            component={TextField}
            fullWidth
            inputRef={nameInputRef}
            label={<FormattedMessage id="ui-serials-management.templates.modelRulesetName" />}
            name="name"
            parse={(v) => v}
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-serials-management.templates.modelRulesetStatus" />}
          >
            {modelRulesetStatus?.label || ''}
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={9}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-serials-management.templates.modelRulesetDescription" />}
            name="modelRulesetDescription"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-serials-management.templates.exampleLabel" />}
            name="exampleLabel"
            parse={(v) => v}
          />
        </Col>
      </Row>
    </>
  );
};

TemplateInfoForm.propTypes = propTypes;

export default TemplateInfoForm;
