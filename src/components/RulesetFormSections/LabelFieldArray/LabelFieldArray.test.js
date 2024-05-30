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
        await waitFor(async () => {
          await Button('Add label').click();
        });
      });

      test('renders the expected Template label', async () => {
        const { getByText } = renderComponent;
        expect(getByText('Template')).toBeInTheDocument();
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

      test('renders the Label style dropdown with correct options', async () => {
        await Select('Label style*').exists();
        await waitFor(async () => {
          await Select('Label style*').choose('Chronology');
          await Select('Label style*').choose('Enumeration');
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

      test('renders the Enumeration format dropdown with correct options', async () => {
        await Select('Enumeration format*').exists();
        await waitFor(async () => {
          await Select('Enumeration format*').choose('Enumeration Numeric');
          await Select('Enumeration format*').choose('Enumeration Textual');
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

    test('renders the Label style dropdown with correct options', async () => {
      await Select('Enumeration format*').exists();
      await waitFor(async () => {
        await Select('Enumeration format*').choose('Enumeration Numeric');
        await Select('Enumeration format*').choose('Enumeration Textual');
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

    test('renders the Chronology format dropdown with correct options', async () => {
      await Select('Chronology format*').exists();
      await waitFor(async () => {
        await Select('Chronology format*').choose('Chronology Date');
        await Select('Chronology format*').choose('Chronology Month');
        await Select('Chronology format*').choose('Chronology Year');
      });
    });

    test('renders ChronologyField', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('ChronologyField')).toBeInTheDocument();
    });
  });
});
