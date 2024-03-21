import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { ruleset } from '../../../test/resources';

const onSubmit = jest.fn();
const setShowModal = jest.fn();

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  FormModal: () => <div>FormModal</div>,
}));

let renderComponent;
describe('PiecesPreviewModal', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <PiecesPreviewModal
          allowCreation
          ruleset={ruleset}
          setShowModal={setShowModal}
          showModal
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the FormModal component', async () => {
    const { getByText } = renderComponent;
    expect(getByText('FormModal')).toBeInTheDocument();
  });
});
