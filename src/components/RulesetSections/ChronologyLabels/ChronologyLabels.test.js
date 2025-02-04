import {
  renderWithIntl,
  Accordion,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import ChronologyLabels from './ChronologyLabels';

import ruleset from '../../../../test/resources/rulesets/ruleset';
import { chronologyDate } from '../../../../test/resources/rulesetResources/chronologyRules';

describe('ChronologyLabels', () => {
  describe('with a ruleset', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          {/* Here w're importing the ruleset object from resource but overwriting the chronology rules */}
          <ChronologyLabels
            ruleset={{
              ...ruleset,
              templateConfig: {
                ...ruleset.templateConfig,
                chronologyRules: [chronologyDate],
              },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    console.log({ ...ruleset, chronologyRules: [chronologyDate] });

    test('renders the Accordion', async () => {
      await Accordion('Chronology labels').exists();
    });

    test('renders the MCL', async () => {
      await MultiColumnList('chronology-labels-list').exists();
    });

    test('renders expected column count', async () => {
      await MultiColumnList({ columnCount: 7 }).exists();
    });

    test('renders expected columns', async () => {
      await MultiColumnList({
        columns: [
          'Labelling',
          'Chronology format',
          'Weekday format',
          'Month day format',
          'Month format',
          'Year format',
          'Locale',
        ],
      }).exists();
    });

    test('renders expected row count', async () => {
      await MultiColumnList({
        rowCount: ruleset.templateConfig.chronologyRules.length,
      }).exists();
    });

    test.each([
      { propertyName: 'Chronology idex', columnIndex: 0, content: 'Chronology 1' },
      { propertyName: 'Chronology format', columnIndex: 1, content: 'Date' },
      { propertyName: 'Weekday format', columnIndex: 2, content: 'Full Lower' },
      { propertyName: 'Month day format', columnIndex: 3, content: 'Number' },
      { propertyName: 'Month format', columnIndex: 4, content: 'Full' },
      { propertyName: 'Year format', columnIndex: 5, content: 'Full' },
      { propertyName: 'Locale', columnIndex: 6, content: 'en' },
    ])(
      'renders expected $propertyName in the the first row, column index $columnIndex',
      async ({ columnIndex, content }) => {
        await MultiColumnListCell({ row: 0, columnIndex }).has({
          content,
        });
      }
    );
  });
});
