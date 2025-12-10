import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../test/helpers';

import TemplateCreateRoute from './TemplateCreateRoute';

jest.mock('../../components/views', () => ({ TemplateForm: () => <div>TemplateForm</div> }));

let renderComponent;
describe('TemplateCreateRoute', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TemplateCreateRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the TemplateForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('TemplateForm')).toBeInTheDocument();
  });
});
