import { renderWithIntl, Button, Callout, Modal } from '@folio/stripes-erm-testing';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useStripes } from '@folio/stripes/core';
import { translationsProperties } from '../../../../test/helpers';

import TemplateView from './TemplateView';

import { handlers, template } from '../../../../test/resources';
import { dayMonth } from '../../../../test/resources/rulesetResources/omissionsRules';
import { issue } from '../../../../test/resources/rulesetResources/combinationRules';

const mockHistoryPush = jest.fn();
const mockLocation = { search: '?filters=modelRulesetStatus.active' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => mockLocation,
}));

jest.mock('../../utils', () => ({
  urls: {
    templateCreate: jest.fn(() => '/serials-management/modelRulesets/create'),
    templates: jest.fn(() => '/serials-management/modelRulesets'),
  },
}));

jest.mock('../../TemplateInfo', () => () => (
  <div>TemplateInfo</div>
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
  LoadingPane: () => <div>LoadingPane</div>,
}));

describe('TemplateView', () => {
  let renderComponent;

  describe('when loading', () => {
    test('renders LoadingPane', async () => {
      const { getByText } = renderWithIntl(
        <MemoryRouter>
          <TemplateView
            onClose={handlers.onClose}
            queryProps={{ isLoading: true }}
            resource={template}
          />
        </MemoryRouter>,
        translationsProperties
      );

      await waitFor(async () => {
        expect(getByText('LoadingPane')).toBeInTheDocument();
      });
    });
  });

  describe('without manage permission', () => {
    beforeEach(() => {
      useStripes().hasPerm.mockReturnValue(false);
    });

    afterEach(() => {
      useStripes().hasPerm.mockReturnValue(true);
    });

    test('does not render the Actions button', async () => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TemplateView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            resource={template}
          />
        </MemoryRouter>,
        translationsProperties
      );

      await waitFor(async () => {
        await Button('Actions').absent();
      });
    });
  });

  describe('with a template which contains only recurrence rules', () => {
    beforeEach(() => {
      mockHistoryPush.mockClear();

      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TemplateView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            resource={{
              ...template,
              serialRuleset: {
                ...template.serialRuleset,
                templateConfig: {
                  templateString: 'Test template string',
                },
              },
            }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test.each([
      { componentName: 'TemplateInfo' },
      { componentName: 'IssuePublication' },
      { componentName: 'DisplaySummaryTemplate' },
    ])('renders $componentName component', async ({ componentName }) => {
      const { getByText } = renderComponent;
      await waitFor(async () => {
        expect(getByText(componentName)).toBeInTheDocument();
      });
    });
  });

  describe('with a template which all potential rules (omssion, combination, enumeration and chronology) ', () => {
    let resourceToCopy;

    beforeEach(() => {
      mockHistoryPush.mockClear();

      resourceToCopy = {
        ...template,
        serialRuleset: {
          ...template.serialRuleset,
          omission: { rules: [dayMonth] },
          combination: { rules: [issue] },
        },
      };

      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TemplateView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            resource={resourceToCopy}
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

    test('Action menu has delete button', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Delete').click();
      });
    });

    test('Action menu has copy button', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Copy').click();
      });
    });

    describe('opening actions menu', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });


      describe('clicking copy', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button('Copy').click();
          });
        });
        test('clicking copy navigates to create route with copyFrom in location state', async () => {
          expect(mockHistoryPush).toHaveBeenCalledWith(
            `/serials-management/modelRulesets/create${mockLocation.search}`,
            { copyFrom: resourceToCopy }
          );
        });
      });

      describe('clicking delete', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button('Delete').click();
          });
        });

        test('renders the confirmation modal', async () => {
          await waitFor(async () => {
            await Modal('Delete publication pattern template').exists();
          });
        });

        describe('cancelling confirmation modal', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Cancel').click();
            });
          });

          test('confirmation modal no longer renders', async () => {
            await waitFor(async () => {
              await Modal('Delete publication pattern template').absent();
            });
          });
        });

        describe('clicking the confirmation delete button', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Delete').click();
            });
          });

          test('delete success callout fires', async () => {
            await waitFor(async () => {
              await Callout('Publication pattern template deleted: <strong>{name}</strong>').exists();
            });
          });
        });
      });
    });
  });
});
