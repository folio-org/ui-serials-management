import React from 'react';
import '@folio/stripes-erm-testing/jest/directMocks';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import SerialView from './SerialView';

const onClose = jest.fn();

describe('SerialView', () => {
  test('renders expected SerialView', () => {
    renderWithIntl(
      <SerialView
        onClose={onClose}
        queryProps={{ isLoading: false }}
        resource={{}}
      />
    );
    // Filler test for intial repo setup
    expect(1).toBe(1);
  });
});
