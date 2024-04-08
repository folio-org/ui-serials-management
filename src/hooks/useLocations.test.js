import { renderHook } from '@testing-library/react';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { useLocations } from './useLocations';

describe('the isLoading property', () => {
  it('should initially return false', async () => {
    const { result } = renderHook(() => useLocations());
    const { isLoading } = result.current;

    expect(isLoading).toBe(false);
    await waitFor(() => {
      expect(isLoading).toBe(false);
    });
  });
});

