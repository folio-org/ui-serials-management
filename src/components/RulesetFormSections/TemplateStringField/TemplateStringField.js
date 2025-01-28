import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Row,
  Col,
  TextArea,
  InfoPopover,
  Layout,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

const TemplateStringField = () => {
  const renderTemplateInfo = () => {
    return (
      <InfoPopover
        content={
          <Layout className="flex flex-direction-column centerContent">
            <Layout>
              <FormattedMessage id="ui-serials-management.ruleset.templatePopover" />
            </Layout>
            <Layout className="marginTop1">
              <Button
                allowAnchorClick
                buttonStyle="primary"
                href="https://folio-org.atlassian.net/wiki/x/dwA7CQ"
                marginBottom0
                rel="noreferrer"
                target="blank"
              >
                <FormattedMessage id="ui-serials-management.learnMore" />
              </Button>
            </Layout>
          </Layout>
        }
      />
    );
  };

  return (
    <Row>
      <Col xs={12}>
        <Field
          component={TextArea}
          label={
            <>
              <FormattedMessage id="ui-serials-management.ruleset.template" />
              {renderTemplateInfo()}
            </>
          }
          name="templateConfig.templateString"
          required
          validate={requiredValidator}
        />
      </Col>
    </Row>
  );
};

export default TemplateStringField;
