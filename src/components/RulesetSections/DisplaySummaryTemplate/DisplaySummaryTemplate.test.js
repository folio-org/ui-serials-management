import { renderWithIntl, Accordion } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import DisplaySummaryTemplate from './DisplaySummaryTemplate';

import ruleset from '../../../../test/resources/rulesets/ruleset';

let renderComponent;

describe('DisplaySummaryTemplate', () => {
  describe('with a standard ruleset', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <DisplaySummaryTemplate ruleset={ruleset} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Accordion', async () => {
      await Accordion('Display summary template').exists();
    });

    test('renders the template string', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText(
          'Vol:{{enumeration1.level1}} Issue:{{enumeration1.level2}}, {{chronology1.year}}'
        )
      ).toBeInTheDocument();
    });
  });
});
