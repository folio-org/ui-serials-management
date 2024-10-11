import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../test/helpers';

import RulesetViewRoute from './RulesetViewRoute';

jest.mock('../../components/views/RulesetView', () => () => <div>RulesetView</div>);

let renderComponent;
describe('RulesetViewRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <RulesetViewRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the RulesetView component', () => {
    const { getByText } = renderComponent;
    expect(getByText('RulesetView')).toBeInTheDocument();
  });
});
