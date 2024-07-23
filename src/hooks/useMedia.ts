import { useCallback, useSyncExternalStore } from "react";
import { type QueryObject, objectToQuery } from "../helpers/object-to-query";

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return undefined;
}

function subscribe(onChange: () => void, query: string) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", onChange);

  return () => {
    mediaQuery.removeEventListener("change", onChange);
  };
}

/**
 * Compare a media query against the browser viewport.
 * Use the breakpoint values from the `screens` export in `src/styles`
 *
 * ```tsx
 * const isTablet = useMedia({ minWidth: '768px' })
 * ```
 **/
export function useMedia(query: QueryObject | string) {
  const queryString = typeof query === "string" ? query : objectToQuery(query);

  const subscribeMediaQuery = useCallback(
    (onChange: () => void) => {
      return subscribe(onChange, queryString);
    },
    [queryString],
  );

  return useSyncExternalStore(
    subscribeMediaQuery,
    () => getSnapshot(queryString),
    getServerSnapshot,
  );
}
