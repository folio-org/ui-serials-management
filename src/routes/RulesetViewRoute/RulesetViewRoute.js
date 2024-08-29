import { useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';

import { RulesetView } from '../../components/views';
import { SERIAL_ENDPOINT, RULESET_ENDPOINT } from '../../constants/endpoints';

import urls from '../../components/utils/urls';

const RulesetViewRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { sid, rid } = useParams();

  const { data: serial } = useQuery(
    ['ui-serials-management', 'RulesetViewRoute', sid],
    () => ky(SERIAL_ENDPOINT(sid)).json()
  );

  const { data: ruleset } = useQuery(
    ['ui-serials-management', 'RulesetViewRoute', rid],
    () => ky(RULESET_ENDPOINT(rid)).json()
  );

  const handleClose = () => {
    history.push(`${urls.serialView(sid)}${location.search}`);
  };

  return (
    <RulesetView onClose={handleClose} ruleset={ruleset} serial={serial} />
  );
};

export default RulesetViewRoute;
