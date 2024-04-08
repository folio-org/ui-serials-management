import { renderHook } from '@testing-library/react';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { useOrder } from './useOrder';

describe('the isLoading property', () => {
  it('should initially return false', async () => {
    const { result } = renderHook(() => useOrder());
    const { isLoading } = result.current;

    expect(isLoading).toBe(false);
    await waitFor(() => {
      expect(isLoading).toBe(false);
    });
  });
});

