/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
  Label,
} from '@folio/stripes/components';

import { getSortedItems } from '../../utils';

const proptypes = {
  ruleset: PropTypes.object,
};

const EnumerationLabels = ({ ruleset }) => {
  const intl = useIntl();

  const sortedLabels = getSortedItems(
    ruleset?.templateConfig?.enumerationRules,
    null,
    {
      column: 'index',
      direction: 'asc',
    }
  );

  const renderEnumerationLabelName = (rule, ruleIndex) => {
    return (
      <Label>
        {`${intl.formatMessage({
          id: 'ui-serials-management.ruleset.enumeration',
        })} ${ruleIndex + 1}: ${rule?.templateMetadataRuleFormat?.label}`}
      </Label>
    );
  };

  const renderEnumerationNumericMCL = (ruleFormat) => {
    const formatter = {
      level: (e) => e?.index + 1,
      units: (e) => e?.units,
      format: (e) => e?.format?.label,
      sequence: (e) => e?.sequence?.label,
      monthFormat: (e) => e?.internalNote,
    };
    return (
      <MultiColumnList
        columnMapping={{
          level: <FormattedMessage id="ui-serials-management.ruleset.level" />,
          units: (
            <FormattedMessage id="ui-serials-management.ruleset.numberOfUnits" />
          ),
          format: (
            <FormattedMessage id="ui-serials-management.ruleset.format" />
          ),
          sequence: (
            <FormattedMessage id="ui-serials-management.ruleset.sequence" />
          ),
          internalNote: (
            <FormattedMessage id="ui-serials-management.ruleset.internalNote" />
          ),
        }}
        contentData={ruleFormat?.levels}
        formatter={formatter}
        id="enumeration-numeric-labels-list"
        interactive={false}
        visibleColumns={[
          'level',
          'units',
          'format',
          'sequence',
          'internalNote',
        ]}
      />
    );
  };

  const renderEnumerationTextualMCL = (ruleFormat) => {
    const formatter = {
      order: (e) => e?.index + 1,
      issues: (e) => e?.units,
      labelText: (e) => e?.value,
      internalNote: (e) => e?.internalNote,
    };
    return (
      <MultiColumnList
        columnMapping={{
          order: <FormattedMessage id="ui-serials-management.ruleset.order" />,
          issues: (
            <FormattedMessage id="ui-serials-management.ruleset.numberOfIssues" />
          ),
          labelText: (
            <FormattedMessage id="ui-serials-management.ruleset.labelText" />
          ),
          internalNote: (
            <FormattedMessage id="ui-serials-management.ruleset.internalNote" />
          ),
        }}
        contentData={ruleFormat?.levels}
        formatter={formatter}
        id="enumeration-textual-labels-list"
        interactive={false}
        visibleColumns={['order', 'issues', 'labelText', 'internalNote']}
      />
    );
  };

  const renderBadge = () => {
    return <Badge>{sortedLabels?.length}</Badge>;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.ruleset.enumerationLabels" />
      }
    >
      {sortedLabels?.map((rule, ruleIndex) => {
        return (
          <>
            <Row>
              {rule?.templateMetadataRuleFormat?.value ===
              'enumeration_numeric' ? (
                <>
                  <Col xs={12}>
                    {renderEnumerationLabelName(rule, ruleIndex)}
                  </Col>
                  <Col xs={12}>
                    {renderEnumerationNumericMCL(rule?.ruleFormat)}
                  </Col>
                </>
                ) : (
                  <>
                    <Col xs={12}>
                      {renderEnumerationLabelName(rule, ruleIndex)}
                    </Col>
                    <Col xs={12}>
                      {renderEnumerationTextualMCL(rule?.ruleFormat)}
                    </Col>
                  </>
                )}
            </Row>
            <br />
          </>
        );
      })}
    </Accordion>
  );
};

EnumerationLabels.propTypes = proptypes;

export default EnumerationLabels;
