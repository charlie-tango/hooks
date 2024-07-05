import { useSyncExternalStore } from "react";

// Void subscription function. You can't go back after hydrating.
const subscribe = () => {
  return () => {};
};

const getSnapshot = () => true;

const getServerSnapshot = () => false;

/**
 * Returns false when serverside rendering and during the first render pass (hydration) in the client.
 * Use this to modify behavior of components when they can be certain they are running client side.
 * Like check a media query during the initial render.
 * */
function useClientHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useClientHydrated;
