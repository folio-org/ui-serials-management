import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, TestForm, Button, Select, TextArea } from '@folio/stripes-erm-testing';

import mockRefdata from '../../../../test/resources/refdata';
import { locales as mockLocales } from '../../../../test/resources';
import LabelFieldArray from './LabelFieldArray';
import { translationsProperties } from '../../../../test/helpers';

jest.mock('react-final-form', () => ({
  ...jest.requireActual('react-final-form'),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
}));

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
  useLocales: () => mockRefdata,
}));

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useLocales: () => ({ isLoading: false, data: mockLocales }),
}));

jest.mock('../ChronologyField', () => () => <div>ChronologyField</div>);
jest.mock('../EnumerationNumericFieldArray', () => () => (
  <div>EnumerationNumericFieldArray</div>
));

jest.mock('../EnumerationTextualFieldArray', () => () => (
  <div>EnumerationTextualFieldArray</div>
));

jest.mock('../ChronologyField', () => () => (
  <div>ChronologyField</div>
));
const onSubmit = jest.fn();


const numericProps = {
  rulesetStatus: {
    value: 'active',
  },
  templateConfig: {
    templateString: 'test',
    rules: [
      {
        templateMetadataRuleType: 'enumeration',
        ruleType: {
          templateMetadataRuleFormat: 'enumeration_numeric',
          ruleFormat: {
            levels: [
              {
                units: '1',
                format: {
                  value: 'number',
                },
                sequence: {
                  value: 'continuous',
                },
                internalNote: 'test note',
              },
            ],
          },
        },
      },
    ],
  },
};

const textualProps = {
  rulesetStatus: {
    value: 'active',
  },
  templateConfig: {
    templateString: 'test',
    rules: [
      {
        templateMetadataRuleType: 'enumeration',
        ruleType: {
          templateMetadataRuleFormat: 'enumeration_textual',
          ruleFormat: {
            levels: [
              {
                units: '1',
                value: 'Friday',
                internalNote: 'note test',
              },
            ],
            refdataCategory: 'Global.Weekday',
          },
        },
      },
    ],
  },
};

const chronologyProps = {
  rulesetStatus: {
    value: 'active',
  },
  templateConfig: {
    templateString: 'test',
    rules: [
      {
        templateMetadataRuleType: 'chronology',
        ruleType: {
          templateMetadataRuleFormat: 'chronology_date',
          ruleFormat: {
            weekdayFormat: {
              value: 'full_lower',
            },
            monthDayFormat: {
              value: 'ordinal',
            },
            monthFormat: {
              value: 'full',
            },
            yearFormat: {
              value: 'full',
            },
          },
        },
      },
    ],
  },
};

let renderComponent;
describe('LabelFieldArray', () => {
  describe('without initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <LabelFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected Template label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Template')).toBeInTheDocument();
    });

    test('renders the expected empty label text', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No labels for this publication pattern')).toBeInTheDocument();
    });

    test('renders the Add label button', async () => {
      await Button('Add label').exists();
    });

    test('not renders ChronologyField', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('ChronologyField')).not.toBeInTheDocument();
    });

    test('not renders the EnumerationNumericFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationNumericFieldArray')).not.toBeInTheDocument();
    });

    test(' not renders EnumerationTextualFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationTextualFieldArray')).not.toBeInTheDocument();
    });

    describe('Adding label', () => {
      beforeEach(async () => {
        const { getByText } = renderComponent;
        await waitFor(async () => {
          await Button('Add label').click();
        });

        // Ensure the template has been added in the beforeEach is a way to shortcut the waits in each test
        await waitFor(() => {
          expect(getByText('Template')).toBeInTheDocument();
        });
      });

      // TODO test names should be clearer about what they're testing
      test('renders the expected Template label', async () => {
        const { getByText } = renderComponent;
        // (follows from above) otherwise you need a waitFor at this level
        // There is no "right" answer here, but this way makes this test redundant and repeated
        // and removing it would make the test case implicit, which isn't necessarily the best idea always
        //await waitFor(() => {
          expect(getByText('Template')).toBeInTheDocument();
        //});
      });

      test('renders the expected Template label', async () => {
        const { getByText } = renderComponent;
        expect(getByText('Remove label 1')).toBeInTheDocument();
      });

      test('renders a label card', () => {
        const { getByText } = renderComponent;
        expect(getByText('Label 1')).toBeInTheDocument();
      });

      test('renders a label style ', () => {
        const { getByText } = renderComponent;
        expect(getByText('Label style')).toBeInTheDocument();
      });

      test('renders a Select for label style', async () => {
        await Select('Label style*').exists();
      });

      test('renders the EditCard by id', () => {
        const { getByTestId } = renderComponent;
        expect(getByTestId('editCard')).toBeInTheDocument();
      });

      describe('testing label style', () => {
        test('renders the Label style dropdown', async () => {
          await Select('Label style*').exists();
        });

        // There's many ways to do this, this way is "choose and check it got chosen"
        describe.each([
          'Chronology',
          'Enumeration'
        ])('choosing %s', (option) => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Select('Label style*').choose(option);
            });
          });

          test('label style has correct value', async () => {
            await Select('Label style*').has({ checkedOptionText: option });
          });
        });
      });
    });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={numericProps} onSubmit={onSubmit}>
          <LabelFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    // TODO Async only needs to be applied to those tests acting asynchronously
    test('renders the expected Template label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Template')).toBeInTheDocument();
    });

    test('renders the Add label button', async () => {
      await Button('Add label').exists();
    });

    test('not renders ChronologyField', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('ChronologyField')).not.toBeInTheDocument();
    });

    test('not renders the EnumerationNumericFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationNumericFieldArray')).toBeInTheDocument();
    });

    test(' not renders EnumerationTextualFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationTextualFieldArray')).not.toBeInTheDocument();
    });

    describe('Adding label', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add label').click();
        });
      });

      test('renders the expected Template with correct value', async () => {
        await TextArea('Template*').has({ value: 'test' });
      });

      test('renders a label card', () => {
        const { getByText } = renderComponent;
        expect(getByText('Label 1: enumeration 1')).toBeInTheDocument();
      });

      test('renders the expected Template label', async () => {
        const { getByText } = renderComponent;
        expect(getByText('Remove label 1')).toBeInTheDocument();
      });

      test('renders the expected Template tokens label', async () => {
        const { getByText } = renderComponent;
        expect(getByText('Template tokens')).toBeInTheDocument();
      });

      test('renders the expected label', async () => {
        const { getByText } = renderComponent;
        expect(getByText('{{enumeration1.level1}}')).toBeInTheDocument();
      });


      test('renders a Select for label style', async () => {
        await Select('Label style*').exists();
      });

      describe('testing enumeration format', () => {
        test('renders the Enumeration format dropdown', async () => {
          await Select('Enumeration format*').exists();
        });

        // There's many ways to do this, this way is "choose and check it got chosen"
        describe.each([
          'Enumeration Numeric',
          'Enumeration Textual'
        ])('choosing %s', (option) => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Select('Enumeration format*').choose(option);
            });
          });

          test('enumeration format has correct value', async () => {
            await Select('Enumeration format*').has({ checkedOptionText: option });
          });
        });
      });

      test('renders the EnumerationNumericFieldArray', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('EnumerationNumericFieldArray')).toBeInTheDocument();
      });
    });
  });

  describe('with initial values (textual)', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={textualProps} onSubmit={onSubmit}>
          <LabelFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    // TODO Repeating this logic isn't the best... should be trying to not have to repeat tests wherever possible
    // I'd like to see the repeated tests EXACT like this one to be covered by describe.each, and the type of testing covered by a utility function.
    // Perhaps "testSelectOptions" as a utility function allowing you to also plug in any follow up tests...
    // That sort of utility could live in stripes-erm-testing and be very handy for speeding up test writing.
    describe('testing enumeration format', () => {
      test('renders the Enumeration format dropdown', async () => {
        await Select('Enumeration format*').exists();
      });

      describe.each([
        'Enumeration Numeric',
        'Enumeration Textual'
      ])('choosing %s', (option) => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Enumeration format*').choose(option);
          });
        });

        test('enumeration format has correct value', async () => {
          await Select('Enumeration format*').has({ checkedOptionText: option });
        });
      });
    });

    test('renders EnumerationTextualFieldArray', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('EnumerationTextualFieldArray')).toBeInTheDocument();
    });
  });

  describe('with initial values (textual)', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={chronologyProps} onSubmit={onSubmit}>
          <LabelFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    describe('testing chronology format', () => {
      test('renders the Chronology format dropdown', async () => {
        await Select('Chronology format*').exists();
      });

      describe.each([
        'Chronology Date',
        'Chronology Month',
        'Chronology Year'
      ])('choosing %s', (option) => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Chronology format*').choose(option);
          });
        });

        test('Chronology format has correct value', async () => {
          await Select('Chronology format*').has({ checkedOptionText: option });
        });
      });
    });

    test('renders ChronologyField', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('ChronologyField')).toBeInTheDocument();
    });
  });
});
