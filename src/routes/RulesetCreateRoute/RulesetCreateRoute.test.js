import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@folio/jest-config-stripes/testing-library/react';
import { translationsProperties } from '../../../test/helpers';

import RulesetCreateRoute from './RulesetCreateRoute';

jest.mock('../../components/views/RulesetForm', () => () => <div>RulesetForm</div>);

const onSubmit = jest.fn();
const rulesetStatus = {
  value: 'active',
};

let renderComponent;
describe('RulesetCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm initialValues={rulesetStatus} onSubmit={onSubmit}>
          <RulesetCreateRoute />
        </TestForm>
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the RulesetForm component', () => {
    screen.debug();
    const { getByText } = renderComponent;
    expect(getByText('RulesetForm')).toBeInTheDocument();
  });
});
