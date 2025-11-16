import { useCallback, useEffect, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type UseFormPersistenceOptions<FormValues extends FieldValues> = {
  storageKey: string;
  form: UseFormReturn<FormValues>;
  debounceMs?: number;
  version?: string;
};

type PersistedPayload<FormValues> = {
  v?: string;
  data: FormValues;
  ts: number;
};

function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const timer = useRef<number | undefined>(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: Parameters<T>) => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }, [delay, fn]);
}

export function useFormPersistence<FormValues extends FieldValues>({
  storageKey,
  form,
  debounceMs = 400,
  version,
}: UseFormPersistenceOptions<FormValues>) {
  const { watch, reset } = form;

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const payload = JSON.parse(raw) as PersistedPayload<FormValues>;
      if (!payload?.data) return;
      // Optional version check
      if (version && payload.v && payload.v !== version) return;
      reset(payload.data, { keepDefaultValues: true });
    } catch {
      // ignore invalid JSON
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, version]);

  // Persist on change (debounced)
  const persist = useDebouncedCallback((values: FormValues) => {
    try {
      const payload: PersistedPayload<FormValues> = {
        v: version,
        data: values,
        ts: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // Quota or serialization error — ignore
    }
  }, debounceMs);

  useEffect(() => {
    const subscription = watch((values) => {
      persist(values as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [persist, watch]);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  return { clear };
}


