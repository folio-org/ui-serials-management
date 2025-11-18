import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import { ruleset } from '../../../../test/resources';

import PublicationCycleInfo from './PublicationCycleInfo';

let renderComponent;

describe('PublicationCycleInfo', () => {
  describe('with a standard ruleset', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PublicationCycleInfo ruleset={ruleset} />,
        translationsProperties
      );
    });

    test('renders the publication cycle header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Publication cycle')).toBeInTheDocument();
    });

    test.each([
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
  });
});
