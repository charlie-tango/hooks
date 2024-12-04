import { useCallback, useSyncExternalStore } from "react";
import { type CookieOptions, getCookie, setCookie } from "../helpers/cookies";
import { addListener, trigger } from "../helpers/listeners";

const SUBSCRIPTION_KEY = "cookies";

function subscribe(callback: () => void) {
  return addListener(SUBSCRIPTION_KEY, callback);
}

type Options = {
  defaultValue?: string;
  cookieOptions?: CookieOptions;
};

/**
 * Get or set a cookie, and update the value when it changes
 * @param key {string} The name of the cookie.
 * @param options {Options} Options for the useCookie hook.
 */
export function useCookie(key: string, options: Options = {}) {
  const getSnapshot = useCallback(() => {
    const cookies = typeof document !== "undefined" ? document.cookie : "";

    return getCookie(key, cookies);
  }, [key]);

  const defaultCookieOptions = options.cookieOptions;

  // biome-ignore lint/correctness/useExhaustiveDependencies: the defaultCookieOptions object is validated as JSON
  const setValue = useCallback(
    (
      newValue?: string | ((prevValue?: string) => string | undefined),
      cookieOptions?: CookieOptions,
    ) => {
      setCookie(
        key,
        typeof newValue === "function" ? newValue(getSnapshot()) : newValue,
        defaultCookieOptions
          ? { ...defaultCookieOptions, ...cookieOptions }
          : cookieOptions,
      );
      trigger(SUBSCRIPTION_KEY);
    },
    [
      key,
      getSnapshot,
      defaultCookieOptions ? JSON.stringify(defaultCookieOptions) : undefined,
    ],
  );

  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return [value || options.defaultValue, setValue] as const;
}
