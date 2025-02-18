import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import PublicationPattern from './PublicationPattern';

import { translationsProperties } from '../../../../test/helpers';

import { serial, ruleset } from '../../../../test/resources';

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
});
