import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import SerialsView from './SerialsView';

const onClose = jest.fn();

describe('SerialsView', () => {
  test('renders expected SerialsView', () => {
    renderWithIntl(
      <SerialsView
        onClose={onClose}
        queryProps={{ isLoading: false }}
        resource={{}}
      />
    );
    // Filler test for intial repo setup
    expect(1).toBe(1);
  });
});
