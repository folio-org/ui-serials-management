import { screen } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  Accordion,
  Badge,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import OmissionRules from './OmissionRules';

import { omissionRuleset } from '../../../../test/resources/rulesets';
import {
  dayWeekMonth as dayWeekMonthOmission,
  week as weekOmission,
  weekRange as weekRangeOmission,
  month as monthOmission,
  monthRange as monthRangeOmission,
  issue as issueOmission,
} from '../../../../test/resources/rulesetResources/omissionsRules';

describe('OmissionRule', () => {
  describe('with an omission ruleset', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <OmissionRules ruleset={omissionRuleset} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Accordion', async () => {
      await Accordion('Omission rules').exists();
    });

    test('renders the Badge with correct number', async () => {
      await Badge('1').exists();
    });

    test('renders the MCL', async () => {
      await MultiColumnList('omission-rules-list').exists();
    });
  });

  describe.each([
    {
      title: 'day week month',
      omission: dayWeekMonthOmission,
      fields: [
        {
          name: 'omission rule type',
          columnIndex: 0,
          content: 'Day (Mon-Sun), Week (1-4), Month (Jan-Dec)',
        },
        { name: 'day', columnIndex: 1, content: 'Monday' },
        { name: 'week', columnIndex: 2, content: '1' },
        { name: 'month', columnIndex: 3, content: 'January' },
      ],
    },
    {
      title: 'week',
      omission: weekOmission,
      fields: [
        { name: 'omission rule type', columnIndex: 0, content: 'Week (1-52)' },
        { name: 'week', columnIndex: 2, content: '1' },
      ],
    },
    {
      title: 'week range',
      omission: weekRangeOmission,
      fields: [
        { name: 'omission rule type', columnIndex: 0, content: 'Week (1-52)' },
        { name: 'week', columnIndex: 2, content: '1 - 2' },
      ],
    },
    {
      title: 'month',
      omission: monthOmission,
      fields: [
        {
          name: 'omission rule type',
          columnIndex: 0,
          content: 'Month (Jan-Dec)',
        },
        { name: 'week', columnIndex: 3, content: 'January' },
      ],
    },
    {
      title: 'month range',
      omission: monthRangeOmission,
      fields: [
        {
          name: 'omission rule type',
          columnIndex: 0,
          content: 'Month (Jan-Dec)',
        },
        { name: 'week', columnIndex: 3, content: 'January - February' },
      ],
    },
    {
      title: 'issue',
      omission: issueOmission,
      fields: [
        { name: 'omission rule type', columnIndex: 0, content: 'Issue (1-n)' },
        { name: 'issue', columnIndex: 4, content: '1' },
      ],
    },
  ])('with a $title omission', ({ omission, fields }) => {
    // Renders the component with the above component props
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <OmissionRules
            ruleset={{
              ...omissionRuleset,
              omission: { ...omissionRuleset.omission, rules: [omission] },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });
    // Since the MCL will change based on pattern type, map the fields to match the column index

    // Checks that all of the fields are rendered
    // Additionally since all MCLs will contain an index column, add it before testing
    test.each(fields)(
      'renders expected $name in the the first row, column index $columnIndex',
      async ({ columnIndex, content }) => {
        screen.debug();
        await MultiColumnListCell({ row: 0, columnIndex }).has({
          content,
        });
      }
    );
  });
});
