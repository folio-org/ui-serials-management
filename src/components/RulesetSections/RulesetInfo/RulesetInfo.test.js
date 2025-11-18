import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';

import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';

import { translationsProperties } from '../../../../test/helpers';

import { ruleset, serial } from '../../../../test/resources';

import RulesetInfo from './RulesetInfo';

let renderComponent;

describe('RulesetInfo', () => {
  describe('with a standard ruleset and serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <RulesetInfo ruleset={ruleset} serial={serial} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders links with the parent serial', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'Interesting Times' })).toBeInTheDocument();
    });

    test.each([
      { keyValueLabel: 'Parent serial', value: 'Interesting Times' },
      { keyValueLabel: 'Pattern description', value: 'Test Description' },
      { keyValueLabel: 'Status', value: 'Active' },
      { keyValueLabel: 'Pattern ID', value: 'Test Pattern ID' },
    ])(
      'renders KeyValue component with label $keyValueLabel with value $value ',
      async ({ keyValueLabel, value }) => {
        await KeyValue(keyValueLabel).has({ value });
      }
    );
  });
});
