import PropTypes from 'prop-types';

import { FormattedMessage, FormattedDate } from 'react-intl';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { PieceSetView } from '../../components/views';
import { RouteSwitcher } from '../../components/SearchAndFilter';

import { PIECE_SETS_ENDPOINT } from '../../constants/endpoints';

const PieceSetsRoute = ({ children, path }) => {
  const fetchParameters = {
    endpoint: PIECE_SETS_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'id',
    },
  };
  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="pieceSets" />;
  };

  const resultColumns = [
    {
      propertyPath: 'dateCreated',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.dateGenerated" />
      ),
    },
    {
      propertyPath: 'title',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.title" />
      ),
    },
    {
      propertyPath: 'total',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.total" />
      ),
    },
    {
      propertyPath: 'startDate',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.startDate" />
      ),
    },
    {
      propertyPath: 'patternId',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.patternId" />
      ),
    },
    {
      propertyPath: 'note',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.note" />
      ),
    },
  ];

  const formatter = {
    dateCreated: (d) => {
      return <FormattedDate value={d?.dateCreated} />;
    },
    // title: (d) => d?.id?.remoteId_object?.titleOrPackage,
    total: (d) => d?.pieces?.length,
    startDate: (d) => {
      return <FormattedDate value={d?.startDate} />;
    },
  };

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="piece-sets"
      mainPaneProps={{
        paneTitle: (
          <FormattedMessage id="ui-serials-management.pieceSets.predictedPieceSets" />
        ),
      }}
      mclProps={{ formatter }}
      path={path}
      resultColumns={resultColumns}
      searchFieldAriaLabel="piece-sets-search-field"
      ViewComponent={PieceSetView}
    >
      {children}
    </SASQRoute>
  );
};

PieceSetsRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default PieceSetsRoute;
