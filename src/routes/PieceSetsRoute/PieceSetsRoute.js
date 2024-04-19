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
      searchKey: 'id,ruleset.rulesetNumber,note',
    },
  };
  /* istanbul ignore next */
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
      label: <FormattedMessage id="ui-serials-management.pieceSets.dateGenerated" />,
    },
    {
      propertyPath: 'total',
      label: <FormattedMessage id="ui-serials-management.pieceSets.total" />,
    },
    {
      propertyPath: 'startDate',
      label: <FormattedMessage id="ui-serials-management.pieceSets.startDate" />,
    },
    {
      propertyPath: 'patternId',
      label: <FormattedMessage id="ui-serials-management.pieceSets.patternId" />,
    },
    {
      propertyPath: 'note',
      label: <FormattedMessage id="ui-serials-management.pieceSets.note" />,
    },
  ];

  const renderTitle = (pieceSet) => {
    return (
      <TextLink to={urls.pieceSetView(pieceSet?.id)}>
        {pieceSet?.title ? (
          <>{`${pieceSet?.title} (${pieceSet?.dateCreated})`}</>
        ) : (
          <>{`${pieceSet?.id} (${pieceSet?.dateCreated})`}</>
        )}
      </TextLink>
    );
  };

  const renderDateCreated = (pieceSet) => {
    return <FormattedDateTime date={pieceSet?.dateCreated} />;
  };
  /* istanbul ignore next */
  const renderStartDate = (pieceSet) => {
    return <FormattedDate value={pieceSet?.startDate} />;
  };

  /* istanbul ignore next */
  const formatter = {
    dateCreated: (d) => renderDateCreated(d),
    title: (d) => renderTitle(d),
    total: (d) => d?.pieces?.length,
    startDate: (d) => renderStartDate(d),
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
