import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
import SerialNoteFieldArray from './SerialNoteFieldArray';

import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

const field = {
  name: 'notes',
};

describe('SerialNoteFieldArray', () => {
  beforeEach(() => {
    renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <SerialNoteFieldArray field={field} />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Add note rule button', async () => {
    await Button('Add note').exists();
  });
});
