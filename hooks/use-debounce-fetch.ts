import { useCallback, useRef, useState } from "react";

export function useDebouncedFetch<T>() {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const resultRef = useRef<T | null>(null);

  const debouncedFetch = useCallback(
    async (fetchFn: (signal: AbortSignal) => Promise<T>) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);

      try {
        const result = await fetchFn(controller.signal);
        resultRef.current = result;

        // Use requestAnimationFrame to ensure these state updates happen
        // in the next browser paint cycle, after the result is processed
        requestAnimationFrame(() => {
          setLoading(false);
        });

        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Request aborted");
          } else {
            console.error(error);
            requestAnimationFrame(() => {
              setLoading(false);
            });
          }
        } else {
          console.error("An unknown error occurred", error);
          requestAnimationFrame(() => {
            setLoading(false);
          });
        }
        throw error;
      }
    },
    []
  );

  return { debouncedFetch, loading };
}
