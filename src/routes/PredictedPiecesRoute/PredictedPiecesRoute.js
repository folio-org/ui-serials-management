import PropTypes from 'prop-types';

import { FormattedMessage, FormattedDate } from 'react-intl';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { PredictedPiecesView } from '../../components/views';
import { RouteSwitcher } from '../../components/SearchAndFilter';

import { PREDICTED_PIECES_ENDPOINT } from '../../constants/endpoints';

const PredictedPiecesRoute = ({ children, path }) => {
  const fetchParameters = {
    endpoint: PREDICTED_PIECES_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'id',
    },
  };
  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="predictedPieces" />;
  };

  const resultColumns = [
    {
      propertyPath: 'dateCreated',
      label: (
        <FormattedMessage id="ui-serials-management.predictedPieces.dateGenerated" />
      ),
    },
    {
      propertyPath: 'title',
      label: (
        <FormattedMessage id="ui-serials-management.predictedPieces.title" />
      ),
    },
    {
      propertyPath: 'total',
      label: (
        <FormattedMessage id="ui-serials-management.predictedPieces.total" />
      ),
    },
    {
      propertyPath: 'startDate',
      label: (
        <FormattedMessage id="ui-serials-management.predictedPieces.startDate" />
      ),
    },
    {
      propertyPath: 'patternId',
      label: (
        <FormattedMessage id="ui-serials-management.predictedPieces.patternId" />
      ),
    },
    {
      propertyPath: 'note',
      label: (
        <FormattedMessage id="ui-serials-management.predictedPieces.note" />
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
      id="predicted-pieces"
      mainPaneProps={{
        paneTitle: (
          <FormattedMessage id="ui-serials-management.predictedPieces" />
        ),
      }}
      mclProps={{ formatter }}
      path={path}
      resultColumns={resultColumns}
      searchFieldAriaLabel="predicted-pieces-search-field"
      ViewComponent={PredictedPiecesView}
    >
      {children}
    </SASQRoute>
  );
};

PredictedPiecesRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default PredictedPiecesRoute;
