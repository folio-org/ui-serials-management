import {
  renderWithIntl,
  Accordion,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import EnumerationLabels from './EnumerationLabels';

import ruleset from '../../../../test/resources/rulesets/ruleset';
import {
  enumerationNumeric,
  enumerationTextual,
} from '../../../../test/resources/rulesetResources/enumerationRules';

let renderComponent;

describe('EnumerationLabels', () => {
  describe('with a ruleset with an enumeration numeric rule', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          {/* Here w're importing the ruleset object from resource but overwriting the enumeration rules */}
          <EnumerationLabels
            ruleset={{
              ...ruleset,
              templateConfig: {
                ...ruleset.templateConfig,
                enumerationRules: [enumerationNumeric],
              },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Accordion', async () => {
      await Accordion('Enumeration labels').exists();
    });

    test('renders the enumeration label name', () => {
      const { getByText } = renderComponent;
      expect(getByText('Enumeration 1: Numeric')).toBeInTheDocument();
    });

    test('renders the MCL', async () => {
      await MultiColumnList('enumeration-numeric-labels-list').exists();
    });

    test('renders expected column count', async () => {
      await MultiColumnList({ columnCount: 5 }).exists();
    });

    test('renders expected columns', async () => {
      await MultiColumnList({
        columns: [
          'Level',
          'No. of units',
          'Format',
          'Sequence',
          'Internal note',
        ],
      }).exists();
    });

    test('renders expected row count', async () => {
      await MultiColumnList({
        rowCount:
          ruleset.templateConfig.enumerationRules[0].ruleFormat.levels.length,
      }).exists();
    });

    test.each([
      { propertyName: 'Level', columnIndex: 0, content: '1' },
      { propertyName: 'No. of units', columnIndex: 1, content: '1' },
      { propertyName: 'Format', columnIndex: 2, content: 'Number' },
      { propertyName: 'Sequence', columnIndex: 3, content: 'Continuous' },
      { propertyName: 'Internal note', columnIndex: 4, content: 'Level 1' },
    ])(
      'renders expected $propertyName in the the first row, column index $columnIndex',
      async ({ columnIndex, content }) => {
        await MultiColumnListCell({ row: 0, columnIndex }).has({
          content,
        });
      }
    );
  });

  describe('with a ruleset with an enumeration textual rule', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          {/* Here w're importing the ruleset object from resource but overwriting the enumeration rules */}
          <EnumerationLabels
            ruleset={{
              ...ruleset,
              templateConfig: {
                ...ruleset.templateConfig,
                enumerationRules: [enumerationTextual],
              },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Accordion', async () => {
      await Accordion('Enumeration labels').exists();
    });

    test('renders the enumeration label name', () => {
      const { getByText } = renderComponent;
      expect(getByText('Enumeration 1: Textual')).toBeInTheDocument();
    });

    test('renders the MCL', async () => {
      await MultiColumnList('enumeration-textual-labels-list').exists();
    });

    test('renders expected column count', async () => {
      await MultiColumnList({ columnCount: 4 }).exists();
    });

    test('renders expected columns', async () => {
      await MultiColumnList({
        columns: ['Order', 'No. of issues', 'Label text', 'Internal note'],
      }).exists();
    });

    test('renders expected row count', async () => {
      await MultiColumnList({
        rowCount:
          ruleset.templateConfig.enumerationRules[0].ruleFormat.levels.length,
      }).exists();
    });

    test.each([
      { propertyName: 'Order', columnIndex: 0, content: '1' },
      { propertyName: 'Issues', columnIndex: 1, content: '1' },
      { propertyName: 'Label text', columnIndex: 2, content: 'Friday' },
      { propertyName: 'Internal note', columnIndex: 3, content: 'Order 1' },
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
