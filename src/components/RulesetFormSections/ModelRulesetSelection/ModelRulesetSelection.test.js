import { fireEvent } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, mockTypedownGetter } from '@folio/stripes-erm-testing';
import ModelRulesetSelection from './ModelRulesetSelection';
import { translationsProperties } from '../../../../test/helpers';

const onChangeMock = jest.fn();
const selectedModelRulesetMock = { name: 'Test Ruleset', description: 'Test Description', exampleLabel: 'Test Label' };

jest.mock('@k-int/stripes-kint-components', () => {
  const { mockKintComponents } = jest.requireActual('@folio/stripes-erm-testing');
  const KintComps = jest.requireActual('@k-int/stripes-kint-components');

  return ({
    ...KintComps,
    ...mockKintComponents,
    QueryTypedown: mockTypedownGetter([selectedModelRulesetMock])
  });
});

let renderComponent;

describe('ModelRulesetSelection', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <ModelRulesetSelection
        onChange={onChangeMock}
        selectedModelRuleset={selectedModelRulesetMock}
      />,
      translationsProperties
    );
  });

  test('renders the QueryTypedown label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Typedown-model-ruleset-typedown')).toBeInTheDocument();
  });

  test('onSelect callback is triggered when the button is clicked', () => {
    const { getByText } = renderComponent;

    const button = getByText(/Typedown-model-ruleset-typedown-option-undefined/i);
    fireEvent.click(button);

    expect(onChangeMock).toHaveBeenCalledWith(selectedModelRulesetMock);
  });
});
