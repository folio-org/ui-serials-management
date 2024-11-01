import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

import POLineFilter from './POLineFilter';
import { translationsProperties } from '../../../../test/helpers';

const onPOLineSelected = jest.fn();
const onSubmit = jest.fn();

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  Pluggable: jest.fn().mockReturnValue('Pluggable')
}));

describe('POLineFilter', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <POLineFilter
            disabled
            name="orderLine"
            onPOLineSelected={onPOLineSelected}
          />
        </TestForm>
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected Pluggable component', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Pluggable')).toBeInTheDocument();
  });

  it('renders the selectPOLinePluggin by id', () => {
    const { getByTestId } = renderComponent;
    expect(getByTestId('selectPOLinePluggin')).toBeInTheDocument();
  });


  // This is kinda pointless... we're testing testForm here not PoLineFilter
  // The worry is that careless copy-pasting like this means that the tests aren't being carefully considered and constructed
  // TODO review this test from the ground up
  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });

  describe('clicking submit', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Submit').click();
      });
    });

    test('submit happened', async () => {
      await waitFor(() => {
        expect(onSubmit.mock.calls.length).toBe(1);
      });
    });
  });

  // TODO this probably isn't necessary here. We can assume basic Pluggable implementations
  // work as they _should_ be tested at the Pluggable level in stripes-core.
  // More interesting implementations where we render fallbacks and stuff we shlud mock Pluggable and test those
  test('should not call the onPOLineSelected callback', () => {
    expect(onPOLineSelected).not.toHaveBeenCalled();
  });
});
