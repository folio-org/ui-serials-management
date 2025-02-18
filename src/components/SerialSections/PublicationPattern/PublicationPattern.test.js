import { MemoryRouter } from 'react-router-dom';

import {
  renderWithIntl,
  KeyValue,
  Button,
  MultiColumnListCell
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import { serial, ruleset } from '../../../../test/resources';
import PublicationPattern from './PublicationPattern';

let renderComponent;

describe('PublicationPattern', () => {
  describe('with an active ruleset and no draft rulesets', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PublicationPattern
            serial={{ ...serial, serialRulesets: [ruleset] }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    // An example of using test.each for key values
    test.each([
      { keyValueLabel: 'Pattern ID', value: 'Test Pattern ID' },
      { keyValueLabel: 'Status', value: 'Active' },
      { keyValueLabel: 'Last updated', value: '2/18/2025' },
      { keyValueLabel: 'Pattern description', value: 'Test Description' },
      { keyValueLabel: 'Time unit', value: 'Month' },
      // This key value label is based on the time unit of the ruleset
      { keyValueLabel: 'Number of months', value: '1' },
      { keyValueLabel: 'No. of issues published per cycle', value: '1' },
    ])(
      'renders KeyValue component with label $keyValueLabel with value $value ',
      async ({ keyValueLabel, value }) => {
        await KeyValue(keyValueLabel).has({ value });
      }
    );

    test('does not render the draft patterns MCL', async () => {
      const { queryByText } = renderComponent;
      expect(queryByText('Draft patterns')).not.toBeInTheDocument();
    });
  });

  describe('with draft rulesets', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PublicationPattern
            serial={{ ...serial, serialRulesets: [ruleset, { ...ruleset, rulesetStatus: { value: 'draft' } }] }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders "Add publication pattern" button', async () => {
      await Button('Add publication pattern').exists();
    });

    test.each([
      { propertyName: 'Pattern ID', columnIndex: 0, content: 'Test Pattern ID' },
      { propertyName: 'Last updated', columnIndex: 1, content: '2/18/2025' },
      { propertyName: 'Pattern description', columnIndex: 2, content: 'Test Description' },
    ])(
      'renders expected $propertyName in the the first row, column index $columnIndex',
      async ({ columnIndex, content }) => {
        await MultiColumnListCell({ row: 0, columnIndex }).has({
          content,
        });
      }
    );

    test('does not render the draft patterns MCL', async () => {
      const { queryByText } = renderComponent;
      expect(queryByText('Draft patterns')).toBeInTheDocument();
    });
  });
});
