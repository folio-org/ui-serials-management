/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { useLocation, Link } from 'react-router-dom';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  Col,
  KeyValue,
  Row,
  Label,
  InfoPopover,
  MultiColumnList,
  Layout,
} from '@folio/stripes/components';

import { urls } from '../../utils';

import css from './PublicationPattern.css';

const proptypes = {
  serial: PropTypes.object,
};

const PublicationPattern = ({ serial }) => {
  const location = useLocation();

  const activeRuleset = serial?.serialRulesets?.find(
    (sr) => sr?.rulesetStatus?.value === 'active'
  );

  const draftRulesets = serial?.serialRulesets?.filter(
    (sr) => sr?.rulesetStatus?.value === 'draft'
  );

  const renderLastUpdated = (ruleset) => {
    return <FormattedDate value={ruleset?.lastUpdated} />;
  };

  const renderRulesetLink = (ruleset) => {
    return (
      <Link to={urls.rulesetView(serial?.id, ruleset?.id)}>
        {ruleset?.rulesetNumber}
      </Link>
    );
  };

  /* istanbul ignore next */
  const formatter = {
    patternId: (e) => {
      return renderRulesetLink(e);
    },
    lastUpdated: (e) => {
      return renderLastUpdated(e);
    },
    description: (e) => {
      return e?.description;
    },
  };

  const renderEmpty = () => {
    return (
      <Layout className={css.isEmptyMessage}>
        <FormattedMessage id="ui-serials-management.serials.publicationPattern.noActivePattern" />
      </Layout>
    );
  };

  const renderBadge = () => {
    return <Badge>{draftRulesets?.length + (activeRuleset ? 1 : 0)}</Badge>;
  };

  const renderAddPublicationPatternButton = () => {
    const isActive = serial?.serialStatus?.value === 'active';
    return (
      <IfPermission perm="ui-serials-management.rulesets.edit">
        <Button
          disabled={!isActive}
          id="add-ruleset-button"
          to={`${urls.rulesetCreate(serial?.id)}${location.search}`}
        >
          <FormattedMessage id="ui-serials-management.serials.addPublicationPattern" />
        </Button>
      </IfPermission>
    );
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderAddPublicationPatternButton()}
      label={
        <FormattedMessage id="ui-serials-management.serials.publicationPattern" />
      }
    >
      {activeRuleset ? (
        <>
          <Row start="xs">
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.patternId" />
                }
                value={
                  <Link to={urls?.rulesetView(serial?.id, activeRuleset?.id)}>
                    <strong>{activeRuleset?.rulesetNumber}</strong>
                  </Link>
                }
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={<FormattedMessage id="ui-serials-management.status" />}
                value={activeRuleset?.rulesetStatus?.label}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.lastUpdated" />
                }
                value={<FormattedDate value={activeRuleset?.lastUpdated} />}
              />
            </Col>
          </Row>
          <Row start="xs">
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.patternDescription" />
                }
                value={activeRuleset?.description}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Label tagName="h4">
                <FormattedMessage id="ui-serials-management.ruleset.publicationCycle" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-serials-management.ruleset.cycleLengthPopover" />
                  }
                />
              </Label>
            </Col>
          </Row>
          <Row start="xs">
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.timeUnit" />
                }
                value={activeRuleset?.recurrence?.timeUnit?.label}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage
                    id={`ui-serials-management.ruleset.numberOfTimeUnit.${activeRuleset?.recurrence?.timeUnit?.value}`}
                  />
                }
                value={activeRuleset?.recurrence?.period}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.numberOfIssuesPerCycle" />
                }
                value={activeRuleset?.recurrence?.issues}
              />
            </Col>
          </Row>
        </>
      ) : (
        renderEmpty()
      )}
      {!!draftRulesets?.length && (
        <>
          <Row>
            <Col xs={6}>
              <Label tagName="h4">
                <FormattedMessage id="ui-serials-management.ruleset.draftPatterns" />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <MultiColumnList
                columnMapping={{
                  patternId: (
                    <FormattedMessage id="ui-serials-management.ruleset.patternId" />
                  ),
                  lastUpdated: (
                    <FormattedMessage id="ui-serials-management.lastUpdated" />
                  ),
                  description: (
                    <FormattedMessage id="ui-serials-management.ruleset.patternDescription" />
                  ),
                }}
                contentData={draftRulesets}
                formatter={formatter}
                id="draft-patterns-list"
                interactive={false}
                visibleColumns={['patternId', 'lastUpdated', 'description']}
              />
            </Col>
          </Row>
        </>
      )}
    </Accordion>
  );
};

PublicationPattern.propTypes = proptypes;

export default PublicationPattern;
