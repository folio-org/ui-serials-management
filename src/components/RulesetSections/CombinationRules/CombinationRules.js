/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
} from '@folio/stripes/components';

import { getSortedItems } from '../../utils';

import { OMISSION_COMBINATION_PATTERN_TYPE_TRANSLATIONS } from '../../../constants/patternTypeTranslations';

const proptypes = {
  ruleset: PropTypes.object,
};

const CombinationRules = ({ ruleset }) => {
  const intl = useIntl();

  const sortedRules = getSortedItems(ruleset?.combination?.rules, null, {
    column: 'patternType.value',
    direction: 'asc',
  });

  const formatter = {
    combinationRuleType: (e) => {
      return OMISSION_COMBINATION_PATTERN_TYPE_TRANSLATIONS[
        e?.patternType?.value
      ]?.labels
        ?.map((l) => intl.formatMessage({ id: l?.id }))
        ?.join(', ');
    },
    issue: (e) => e?.pattern?.issue,
    ofWeek: (e) => {
      return e?.pattern?.weekTo
        ? `${e?.pattern?.weekFrom} - ${e?.pattern?.weekTo}`
        : e?.pattern?.weekFrom ?? e?.pattern?.week;
    },
    ofMonth: (e) => {
      return e?.pattern?.monthTo
        ? `${e?.pattern?.monthFrom?.label} - ${e?.pattern?.monthTo?.label}`
        : e?.pattern?.monthFrom?.label ?? e?.pattern?.month?.label;
    },
    issuesToCombine: (e) => e?.issuesToCombine,
  };

  const renderBadge = () => {
    return <Badge>{ruleset?.combination?.rules?.length}</Badge>;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.ruleset.combinationRules" />
      }
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              combinationRuleType: (
                <FormattedMessage id="ui-serials-management.ruleset.combinationRuleType" />
              ),
              issue: (
                <FormattedMessage id="ui-serials-management.ruleset.issue" />
              ),
              ofWeek: (
                <FormattedMessage id="ui-serials-management.ruleset.ofWeek" />
              ),
              ofMonth: (
                <FormattedMessage id="ui-serials-management.ruleset.ofMonth" />
              ),
              issuesToCombine: (
                <FormattedMessage id="ui-serials-management.ruleset.numberOfIssuesToCombine" />
              ),
            }}
            contentData={sortedRules}
            formatter={formatter}
            interactive={false}
            visibleColumns={[
              'combinationRuleType',
              'issue',
              'ofWeek',
              'ofMonth',
              'issuesToCombine',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

CombinationRules.propTypes = proptypes;

export default CombinationRules;
