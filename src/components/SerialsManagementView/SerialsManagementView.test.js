import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import SerialsManagementView from './SerialsManagementView';

describe('SerialsManagementView', () => {
  test('renders expected SerialsManagementView', () => {
    renderWithIntl(<SerialsManagementView />);
    // Filler test for intial repo setup
    expect(1).toBe(1);
  });
});
