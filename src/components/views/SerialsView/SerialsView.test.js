import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import SerialsView from './SerialsView';

describe('SerialsView', () => {
  test('renders expected SerialsView', () => {
    renderWithIntl(<SerialsView />);
    // Filler test for intial repo setup
    expect(1).toBe(1);
  });
});
