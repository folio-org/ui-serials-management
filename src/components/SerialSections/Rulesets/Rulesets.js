/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { Accordion, Badge, Button } from '@folio/stripes/components';

import { urls } from '../../utils';

const proptypes = {
  serial: PropTypes.object,
};

const Rulesets = ({ serial }) => {
  const location = useLocation();

  const renderBadge = (serialRulesets) => {
    return serialRulesets ? (
      <Badge>{serialRulesets?.length}</Badge>
    ) : (
      <Badge>0</Badge>
    );
  };

  const renderAddChargesButton = () => {
    return (
      <>
        <Button
          id="add-ruleset-button"
          to={`${urls.rulesetCreate(serial?.id)}${location.search}`}
        >
          <FormattedMessage id="ui-serials-management.serials.addRuleset" />
        </Button>
      </>
    );
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(serial?.serialRulesets)}
      displayWhenOpen={renderAddChargesButton()}
      label={
        <FormattedMessage id="ui-serials-management.serials.recurrenceRulesets" />
      }
    >
      <ul>
        {serial?.serialRulesets?.map((e) => (
          <li>{e?.id}</li>
        ))}
      </ul>
    </Accordion>
  );
};

Rulesets.propTypes = proptypes;

export default Rulesets;
