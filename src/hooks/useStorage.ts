import { useCallback, useSyncExternalStore } from "react";
import { addListener, trigger } from "../helpers/listeners";

const serverSnapShot = () => null;
type Options = {
  type?: "local" | "session";
  /** Default value to use if the key is not set in storage. */
  defaultValue?: string;
};

/**
 * Get or set a value in local or session storage, and update the value when it changes.
 * @param key
 * @param options
 */
export function useStorage(key: string, options: Options = {}) {
  const type = options.type ?? "local";
  // Key to use for the subscription, so we can trigger snapshot updates for this specific storage key
  const subscriptionKey = `storage-${type}-${key}`;

  const getSnapshot = useCallback(() => {
    if (type === "local") return window.localStorage.getItem(key);
    return window.sessionStorage.getItem(key);
  }, [key, type]);

  const subscribe = useCallback(
    (callback: () => void) => {
      return addListener(subscriptionKey, callback);
    },
    [subscriptionKey],
  );

  const setValue = useCallback(
    (
      newValue?:
        | string
        | ((prevValue?: string | null) => string | undefined | null),
    ) => {
      const storage =
        type === "local" ? window.localStorage : window.sessionStorage;

      const value =
        typeof newValue === "function"
          ? newValue(storage.getItem(key))
          : newValue;

      if (value) storage.setItem(key, value);
      else storage.removeItem(key);

      trigger(subscriptionKey);
    },
    [subscriptionKey, key, type],
  );

  const value = useSyncExternalStore(subscribe, getSnapshot, serverSnapShot);

  return [value || options.defaultValue || null, setValue] as const;
}
