import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../test/helpers';

import RulesetEditRoute from './RulesetEditRoute';

jest.mock('../../components/views/RulesetForm', () => () => <div>RulesetForm</div>);

let renderComponent;
describe('RulesetEditRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RulesetEditRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the RulesetForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('RulesetForm')).toBeInTheDocument();
  });
});
