import { renderWithIntl, Pane } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import PickListSettings from './PickListSettings';

import { translationsProperties } from '../../../test/helpers';
import mockRefdata from '../../../test/resources/refdata';

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  EditableRefdataCategoryList: () => <div>EditableRefdataCategoryList</div>,
}));

jest.mock('../../components/utils', () => ({
  ...jest.requireActual('../../components/utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

describe('PickListSettings', () => {
  describe('rendering the PickListSettings', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PickListSettings />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the EditableRefdataCategoryList component', () => {
      const { getByText } = renderComponent;
      expect(getByText('EditableRefdataCategoryList')).toBeInTheDocument();
    });

    test('renders the Pick lists label', () => {
      const { getByText } = renderComponent;
      expect(getByText('Pick lists')).toBeInTheDocument();
    });

    test('displays the Pick lists pane', async () => {
      await Pane('Pick lists').is({ visible: true });
    });
  });
});
