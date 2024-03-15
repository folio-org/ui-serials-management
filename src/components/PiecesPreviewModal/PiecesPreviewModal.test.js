import {
  renderWithIntl,
  TestForm,
  Button,
  TextArea,
} from '@folio/stripes-erm-testing';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { ruleset } from '../../../test/resources';

const onSubmit = jest.fn();
const setShowModal = jest.fn();

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

  test('renders the modal headline', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Generate predicted pieces')).toBeInTheDocument();
  });

  test('renders the note field', async () => {
    await TextArea('Note').exists();
  });

  test('renders the close button', async () => {
    await Button('Close').exists();
  });

  test('Close button should be enabeled', async () => {
    await Button('Close').has({ disabled: false });
  });

  test('Generate button should be disabled', async () => {
    await Button('Generate').has({ disabled: true });
  });

  test('Preview button should be disabled', async () => {
    await Button('Preview').has({ disabled: true });
  });
});
