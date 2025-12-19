import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../test/helpers';

import RulesetReplaceRoute from './RulesetReplaceRoute';

jest.mock('../../components/views', () => ({ RulesetForm: () => <div>RulesetForm</div> }));

let renderComponent;
describe('RulesetReplaceRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RulesetReplaceRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the RulesetForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('RulesetForm')).toBeInTheDocument();
  });
});
