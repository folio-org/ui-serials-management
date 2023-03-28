import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Row, Col, TextArea, Select } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';
import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

const [RULESET_STATUS] = ['SerialRuleset.Status'];

const RulesetInfoForm = () => {
  const refdataValues = useSerialsManagementRefdata([RULESET_STATUS]);

  return (
    <Row>
      <Col xs={3}>
        <Field
          component={Select}
          dataOptions={[
            { value: '', label: '' },
            ...selectifyRefdata(refdataValues, RULESET_STATUS, 'value'),
          ]}
          label={<FormattedMessage id="ui-serials-management.status" />}
          name="rulesetStatus.value"
          required
          validate={requiredValidator}
        />
      </Col>
      <Col xs={6}>
        <Field
          component={TextArea}
          fullWidth
          label={<FormattedMessage id="ui-serials-management.description" />}
          name="description"
          parse={(v) => v}
        />
      </Col>
    </Row>
  );
};

export default RulesetInfoForm;
