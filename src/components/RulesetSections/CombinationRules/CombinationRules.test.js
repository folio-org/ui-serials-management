import {
  renderWithIntl,
  Accordion,
  Badge,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import CombinationRules from './CombinationRules';

import { combinationRuleset } from '../../../../test/resources/rulesets';
import {
  issue as issueCombination,
  issueWeekMonth as issueWeekMonthCombination,
} from '../../../../test/resources/rulesetResources/combinationRules';

describe('CombinationRules', () => {
  describe('with an combination ruleset', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <CombinationRules ruleset={combinationRuleset} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Accordion', async () => {
      await Accordion('Combination rules').exists();
    });

    test('renders the Badge with correct number', async () => {
      await Badge('1').exists();
    });

    test('renders the MCL', async () => {
      await MultiColumnList('combination-rules-list').exists();
    });
  });

  // These should cover all potential combination rules displays
  // If more combination pattern types are added, this may need to be expanded
  describe.each([
    {
      title: 'issue',
      combination: issueCombination,
      fields: [
        {
          name: 'combination rule type',
          columnIndex: 0,
          content: 'Issue (1-n)',
        },
        { name: 'issue', columnIndex: 1, content: '1' },
        { name: 'issues to combine', columnIndex: 4, content: '2' },
      ],
    },
    {
      title: 'issue week month',
      combination: issueWeekMonthCombination,
      fields: [
        {
          name: 'combination rule type',
          columnIndex: 0,
          content: 'Issue (1-n), Week (1-4), Month (Jan-Dec)',
        },
        { name: 'issue', columnIndex: 1, content: '1' },
        { name: 'week', columnIndex: 2, content: '1' },
        { name: 'month', columnIndex: 3, content: 'January' },
        { name: 'issues to combine', columnIndex: 4, content: '2' },
      ],
    },
  ])('with a $title combination', ({ combination, fields }) => {
    // Renders the component with the above component props
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <CombinationRules
            ruleset={{
              ...combinationRuleset,
              combination: {
                ...combinationRuleset.combination,
                rules: [combination],
              },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    // Checks that all of the fields are rendered
    // Additionally since all MCLs will contain an index column, add it before testing
    test.each(fields)(
      'renders expected $name in the the first row, column index $columnIndex',
      async ({ columnIndex, content }) => {
        await MultiColumnListCell({ row: 0, columnIndex }).has({
          content,
        });
      }
    );
  });
});
