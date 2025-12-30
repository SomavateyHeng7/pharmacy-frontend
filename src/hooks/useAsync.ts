'use client';

import { useState, useCallback } from 'react';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useAsync<T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options?: UseAsyncOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
}
