import { FieldArray } from 'react-final-form-arrays';
import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
import { screen } from '@folio/jest-config-stripes/testing-library/react';
import OmissionFieldArray from './OmissionFieldArray';

import { translationsProperties } from '../../../../test/helpers';

jest.mock('../CombinationField', () => () => <div>CombinationField</div>);
const onSubmit = jest.fn();

const data = {
  'rulesetStatus': {
    'value': 'active',
  },
  'omission': {
    'rules': [
      {
        'timeUnit': {
          'value': 'month',
        },
        'patternType': 'month',
        'pattern': {
          'monthFrom': {
            'value': 'january',
          },
          'isRange': true,
          'monthTo': {
            'value': 'december',
          },
        },
      },
    ],
  },
  'recurrence': {
    'timeUnit': {
      'value': 'day',
    },
    'period': '1',
    'issues': '1',
    'rules': [{}],
  },
  'patternType': 'day',
};

let renderComponent;
describe('OmissionFieldArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <FieldArray
          component={OmissionFieldArray}
          data={data}
          name="omission.rules"
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected empty omission rule label', async () => {
    const { getByText } = renderComponent;
    expect(
      getByText('No omission rules for this publication pattern')
    ).toBeInTheDocument();
  });

  test('renders the Add omission rule button', async () => {
    screen.debug();
    await Button('Add omission rule').exists();
  });
});
