import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../test/helpers';

import RulesetCreateRoute from './RulesetCreateRoute';

jest.mock('../../components/views', () => ({ RulesetForm: () => <div>RulesetForm</div> }));

let renderComponent;
describe('RulesetCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RulesetCreateRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the RulesetForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('RulesetForm')).toBeInTheDocument();
  });
});
