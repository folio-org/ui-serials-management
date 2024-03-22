import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../test/helpers';
import SerialForm from './SerialForm';
import { handlers } from '../../../../test/resources';

jest.mock('../../SerialFormSections/POLineForm', () => () => (
  <div>POLineForm</div>
));
jest.mock('../../SerialFormSections/SerialInfoForm', () => () => (
  <div>SerialInfoForm</div>
));
jest.mock('../../SerialFormSections/SerialNoteFieldArray', () => () => (
  <div>SerialNoteFieldArray</div>
));

const onSubmit = jest.fn();

describe('SerialForm', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          {/* From next version handleSubmit should be passed down in TestForm children func */}
          <SerialForm handlers={{ onClose: handlers.onClose, onSubmit }} />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders POLineForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('POLineForm')).toBeInTheDocument();
    });

    test('renders SerialInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialInfoForm')).toBeInTheDocument();
    });
    test('renders SerialNoteFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialNoteFieldArray')).toBeInTheDocument();
    });
  });
});
