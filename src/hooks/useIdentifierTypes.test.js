import { renderHook } from '@testing-library/react';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { useIdentifierTypes } from './useIdentifierTypes';

describe('the isLoading property', () => {
  it('should initially return false', async () => {
    const { result } = renderHook(() => useIdentifierTypes());
    const { isLoading } = result.current;

    expect(isLoading).toBe(false);
    await waitFor(() => {
      expect(isLoading).toBe(false);
    });
  });
});

