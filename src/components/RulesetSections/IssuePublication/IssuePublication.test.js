import {
  renderWithIntl,
  Accordion,
  Badge,
  KeyValue,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import IssuePublication from './IssuePublication';

import ruleset from '../../../../test/resources/rulesets/ruleset';
import {
  day as dayRecurrence,
  week as weekRecurrence,
  monthDate as monthDateRecurrence,
  monthWeekday as monthWeekdayRecurrence,
  yearDate as yearDateRecurrence,
  yearWeekday as yearWeekdayRecurrence,
  yearMonthWeekday as yearMonthWeekdayRecurrence,
} from '../../../../test/resources/rulesetResources/recurrences';

describe('IssuePublication', () => {
  describe('with a standard ruleset', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <IssuePublication ruleset={ruleset} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Accordion', async () => {
      await Accordion('Days of publication, per cycle').exists();
    });

    test('renders the Badge with correct number', async () => {
      await Badge('1').exists();
    });

    test('renders the day format KeyValue with the correct value', async () => {
      await KeyValue('Day format').has({ value: 'Day (1-31)' });
    });

    test('renders the MCL', async () => {
      await MultiColumnList('issue-publication-list').exists();
    });
  });

  describe.each([
    {
      title: 'day',
      recurrence: dayRecurrence,
      fields: [{ name: 'day', content: '1' }],
    },
    {
      title: 'week',
      recurrence: weekRecurrence,
      fields: [
        { name: 'day', content: 'Monday' },
        { name: 'week', content: '1' },
      ],
    },
    {
      title: 'month date',
      recurrence: monthDateRecurrence,
      fields: [
        { name: 'day', content: '1' },
        { name: 'month', content: '1' },
      ],
    },
    {
      title: 'month weekday',
      recurrence: monthWeekdayRecurrence,
      fields: [
        { name: 'day', content: 'Monday' },
        { name: 'week', content: '1' },
      ],
    },
    {
      title: 'year date',
      recurrence: yearDateRecurrence,
      fields: [
        { name: 'day', content: '1' },
        { name: 'month', content: 'February' },
        { name: 'year', content: '1' },
      ],
    },
    {
      title: 'year weekday',
      recurrence: yearWeekdayRecurrence,
      fields: [
        { name: 'day', content: 'Monday' },
        { name: 'week', content: '1' },
        { name: 'year', content: '1' },
      ],
    },
    {
      title: 'year month weekday',
      recurrence: yearMonthWeekdayRecurrence,
      fields: [
        { name: 'day', content: 'Monday' },
        { name: 'week', content: '1' },
        { name: 'month', content: 'January' },
        { name: 'year', content: '1' },
      ],
    },
  ])('with a $title recurrence', ({ recurrence, fields }) => {
    // Renders the component with the above component props
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <IssuePublication ruleset={{ ...ruleset, recurrence }} />
        </MemoryRouter>,
        translationsProperties
      );
    });
    // Since the MCL will change based on pattern type, map the fields to match the column index
    const expectedFields = fields.map((e, i) => {
      return { ...e, columnIndex: i + 1 };
    });
    // Checks that all of the fields are rendered
    // Additionally since all MCLs will contain an index column, add it before testing
    test.each([
      { name: 'issue', content: '1', columnIndex: 0 },
      ...expectedFields,
    ])(
      'renders expected $name in the the first row, column index $columnIndex',
      async ({ columnIndex, content }) => {
        await MultiColumnListCell({ row: 0, columnIndex }).has({
          content,
        });
      }
    );
  });
});
