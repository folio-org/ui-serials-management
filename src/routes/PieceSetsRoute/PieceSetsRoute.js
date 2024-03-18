import PropTypes from 'prop-types';

import { FormattedMessage, FormattedDate } from 'react-intl';

import { TextLink } from '@folio/stripes/components';

import { FormattedDateTime } from '@folio/stripes-erm-components';

import { SASQRoute } from '@k-int/stripes-kint-components';

import { PieceSetView } from '../../components/views';
import { RouteSwitcher } from '../../components/SearchAndFilter';
import { urls } from '../../components/utils';

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
      propertyPath: 'title',
      label: <FormattedMessage id="ui-serials-management.pieceSets.title" />,
    },
    {
      propertyPath: 'dateCreated',
      label: (
        <FormattedMessage id="ui-serials-management.pieceSets.dateGenerated" />
      ),
    },
    {
      propertyPath: 'total',
      label: <FormattedMessage id="ui-serials-management.pieceSets.total" />,
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
      label: <FormattedMessage id="ui-serials-management.pieceSets.note" />,
    },
  ];

  const formatter = {
    dateCreated: (d) => <FormattedDateTime date={d?.dateCreated} />,
    title: (d) => (
      <TextLink to={urls.pieceSetView(d?.id)}>
        {d?.title ? (
          <>{`${d?.title} (${d?.dateCreated})`}</>
        ) : (
          <>{`${d?.id} (${d?.dateCreated})`}</>
        )}
      </TextLink>
    ),
    total: (d) => d?.pieces?.length,
    startDate: (d) => <FormattedDate value={d?.startDate} />,
    patternId: (d) => d?.ruleset?.rulesetNumber,
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
      mclProps={{
        formatter,
        interactive: false,
        onRowClick: null,
        id: 'list-predicted-piece-sets',
      }}
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
  path: PropTypes.string,
};

export default PieceSetsRoute;
