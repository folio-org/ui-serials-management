import { renderWithIntl } from '@folio/stripes-erm-testing';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import RulesetView from './RulesetView';

// TODO Imports like this need to be sorted, this is messy
import { handlers, ruleset } from '../../../../test/resources';
import { dayMonth } from '../../../../test/resources/rulesetResources/omissionsRules';
import { issue } from '../../../../test/resources/rulesetResources/combinationRules';

jest.mock('../../RulesetSections/RulesetInfo', () => () => (
  <div>RulesetInfo</div>
));
jest.mock('../../RulesetSections/IssuePublication', () => () => (
  <div>IssuePublication</div>
));
jest.mock('../../RulesetSections/OmissionRules', () => () => (
  <div>OmissionRules</div>
));
jest.mock('../../RulesetSections/CombinationRules', () => () => (
  <div>CombinationRules</div>
));
jest.mock('../../RulesetSections/ChronologyLabels', () => () => (
  <div>ChronologyLabels</div>
));
jest.mock('../../RulesetSections/EnumerationLabels', () => () => (
  <div>EnumerationLabels</div>
));
jest.mock('../../RulesetSections/DisplaySummaryTemplate', () => () => (
  <div>DisplaySummaryTemplate</div>
));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  MetaSection: () => <div>MetaSection</div>,
}));

describe('RulesetView', () => {
  let renderComponent;

  describe('with a ruleset which contains only recurrence rules', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <RulesetView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            // Using centralised ruleset but removing existing templateConfig rules
            ruleset={{
              ...ruleset,
              templateConfig: { templateString: 'Test template string' },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test.each([
      { componentName: 'RulesetInfo' },
      { componentName: 'IssuePublication' },
      { componentName: 'DisplaySummaryTemplate' },
    ])('renders $componentName component', async ({ componentName }) => {
      const { getByText } = renderComponent;
      await waitFor(async () => {
        expect(getByText(componentName)).toBeInTheDocument();
      });
    });
  });

  describe('with a ruleset which all potential rules (omssion, combination, enumeration and chronology) ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <RulesetView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            // Using centralised ruleset adding combination/omissions
            // This would never be the case but nicer to have it all in a single desribe block
            // Additionally the conditionals in the component dont do anything fancy
            ruleset={{
              ...ruleset,
              omission: { rules: [dayMonth] },
              combination: { rules: [issue] },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test.each([
      { componentName: 'OmissionRules' },
      { componentName: 'CombinationRules' },
      { componentName: 'ChronologyLabels' },
      { componentName: 'EnumerationLabels' },
    ])('renders $componentName component', async ({ componentName }) => {
      const { getByText } = renderComponent;
      await waitFor(async () => {
        expect(getByText(componentName)).toBeInTheDocument();
      });
    });
  });
});
