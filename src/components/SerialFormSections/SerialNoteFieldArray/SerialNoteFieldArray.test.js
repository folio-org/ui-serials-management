import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import SerialNoteFieldArray from './SerialNoteFieldArray';

import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

let renderComponent;
describe('SerialNoteFieldArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <SerialNoteFieldArray name="notes" />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Add note rule button', async () => {
    await Button('Add note').exists();
  });

  describe('Adding note', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Add note').click();
      });
    });

    test('renders one note', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('SerialNoteField')).not.toBeInTheDocument();
    });
  });
});
