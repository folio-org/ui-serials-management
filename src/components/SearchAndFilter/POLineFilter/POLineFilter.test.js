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

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });

  test('clicking the submit button ', async () => {
    await waitFor(async () => {
      await Button('Submit').click();
    });

    expect(onSubmit.mock.calls.length).toBe(1);
  });

  test('should not call the onPOLineSelected callback', () => {
    expect(onPOLineSelected).not.toHaveBeenCalled();
  });
});
