import PropTypes from 'prop-types';

import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Label,
  Row,
  Col,
  InfoPopover,
  Layout,
} from '@folio/stripes/components';
import { ClipCopy } from '@folio/stripes/smart-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import EnumerationNumericField from './EnumerationNumericField';

const EnumerationNumericFieldArray = ({ name, index }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    `${name}.levels`
  );

  const renderTemplateTokensInfo = () => {
    return (
      <InfoPopover
        content={
          <Layout className="flex flex-direction-column centerContent">
            <Layout>
              <FormattedMessage id="ui-serials-management.ruleset.templateTokensPopover" />
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

  const renderTokenText = () => {
    const stringArray = items?.reduce(
      (a, _l, li) => [...a, `{{enumeration${index + 1}.level${li + 1}}}`],
      []
    );
    return stringArray.join(' ');
  };

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
            <FormattedMessage id="ui-serials-management.ruleset.numberOfUnits" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label required>
            <FormattedMessage id="ui-serials-management.ruleset.format" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label required>
            <FormattedMessage id="ui-serials-management.ruleset.sequence" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label>
            <FormattedMessage id="ui-serials-management.ruleset.internalNote" />
          </Label>
        </Col>
      </Row>
      <FieldArray name={`${name}.levels`}>
        {() => items?.map((level, levelIndex) => {
          return (
            <EnumerationNumericField
              key={`enumeration-numeric-field-${levelIndex}`}
              index={levelIndex}
              items={items}
              level={level}
              name={`${name}.levels[${levelIndex}]`}
              onDeleteField={onDeleteField}
            />
          );
        })
        }
      </FieldArray>
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addLevel" />
      </Button>
      <Label id="template-token-header">
        <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
        {renderTemplateTokensInfo()}
        <ClipCopy text={renderTokenText()} />
      </Label>
      {renderTokenText()}
    </>
  );
};

EnumerationNumericFieldArray.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
};

export default EnumerationNumericFieldArray;
