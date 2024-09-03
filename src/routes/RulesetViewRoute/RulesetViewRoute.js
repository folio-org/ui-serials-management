import { useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';

import { LoadingPane } from '@folio/stripes/components';

import { RulesetView } from '../../components/views';
import { urls } from '../../components/utils';

import { DEFAULT_VIEW_PANE_WIDTH } from '../../constants/config';
import { SERIAL_ENDPOINT, RULESET_ENDPOINT } from '../../constants/endpoints';


const RulesetViewRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { sid, rid } = useParams();

  const { data: serial, isLoading: serialLoading } = useQuery(
    ['ui-serials-management', 'RulesetViewRoute', sid],
    () => ky(SERIAL_ENDPOINT(sid)).json()
  );

  const { data: ruleset, isLoading: rulesetLoading } = useQuery(
    ['ui-serials-management', 'RulesetViewRoute', rid],
    () => ky(RULESET_ENDPOINT(rid)).json()
  );

  const handleClose = () => {
    history.push(`${urls.serialView(sid)}${location.search}`);
  };

  if (serialLoading || rulesetLoading) {
    return (
      <LoadingPane
        defaultWidth={DEFAULT_VIEW_PANE_WIDTH}
        dismissible
        onClose={handleClose}
      />
    );
  }

  return (
    <RulesetView onClose={handleClose} ruleset={ruleset} serial={serial} />
  );
};

export default RulesetViewRoute;
