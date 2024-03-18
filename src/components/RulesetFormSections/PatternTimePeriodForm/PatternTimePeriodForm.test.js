import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import PatternTimePeriodForm from './PatternTimePeriodForm';
import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();
describe('PatternTimePeriodForm', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <PatternTimePeriodForm />
        </TestForm>
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Cycle length')).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Time unit')).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Number of time units')).toBeInTheDocument();
  });
});
