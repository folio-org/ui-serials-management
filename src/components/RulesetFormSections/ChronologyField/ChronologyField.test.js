import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Select,
  Button,
} from '@folio/stripes-erm-testing';

import ChronologyField from './ChronologyField';

import { translationsProperties } from '../../../../test/helpers';
import mockRefdata from '../../../../test/resources/refdata';

const templateConfig = {
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
};

const tokenIndex = 2;

const values = {
  'rulesetStatus': {
    'value': 'active'
  },
  'templateConfig': {
    'rules': [
      {
        'templateMetadataRuleType': 'enumeration',
        'ruleType': {
          'templateMetadataRuleFormat': 'enumeration_numeric',
          'ruleFormat': {
            'levels': [
              '{}'
            ]
          }
        }
      },
      {
        'templateMetadataRuleType': 'enumeration',
        'ruleType': {
          'templateMetadataRuleFormat': 'enumeration_numeric',
          'ruleFormat': '{levels: Array(1)}'
        }
      },
      {
        'templateMetadataRuleType': 'chronology',
        'ruleType': {
          'ruleLocale': 'en',
          'templateMetadataRuleFormat': 'chronology_date'
        }
      },
      {
        'templateMetadataRuleType': 'chronology',
        'ruleType': {
          'ruleLocale': 'en',
          'templateMetadataRuleFormat': 'chronology_year'
        }
      },
      {
        'templateMetadataRuleType': 'enumeration',
        'ruleType': {
          'templateMetadataRuleFormat': 'enumeration_textual',
          'ruleFormat': '{levels: Array(1)}'
        }
      }
    ]
  }
};

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

const onSubmit = jest.fn();

let renderComponent;
describe('ChronologyField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <ChronologyField
          name="templateConfig.rules[0].ruleType.ruleFormat"
          templateConfig={templateConfig}
          tokenIndex={tokenIndex}
          values={values}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected template tokens label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Template tokens')).toBeInTheDocument();
  });

  test('renders the expected template tokens', async () => {
    const { getByText } = renderComponent;
    expect(
      getByText(
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}'
      )
    ).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Weekday format')).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Month day format')).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Month format')).toBeInTheDocument();
  });

  test('renders the expected text', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Year format')).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Template tokens')).toBeInTheDocument();
  });

  test('renders a Select for Weekday format', async () => {
    await Select('Weekday format*').exists();
  });

  test('renders the Weekday format dropdown with correct options', async () => {
    await Select('Weekday format*').exists();
    await waitFor(async () => {
      await Select('Weekday format*').choose('Monday');
      await Select('Weekday format*').choose('MONDAY');
      await Select('Weekday format*').choose('Mon');
      await Select('Weekday format*').choose('MON');
    });
  });

  test('renders the Month day format dropdown with correct options', async () => {
    await Select('Month day format*').exists();
    await waitFor(async () => {
      await Select('Month day format*').choose('3');
      await Select('Month day format*').choose('3rd');
    });
  });

  test('renders the Month format dropdown with correct options', async () => {
    await Select('Month format*').exists();
    await waitFor(async () => {
      await Select('Month format*').choose('October');
      await Select('Month format*').choose('10');
      await Select('Month format*').choose('Oct');
    });
  });

  test('renders the Year format dropdown with correct options', async () => {
    await Select('Year format*').exists();
    await waitFor(async () => {
      await Select('Year format*').choose('2023');
      await Select('Year format*').choose('23');
    });
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
