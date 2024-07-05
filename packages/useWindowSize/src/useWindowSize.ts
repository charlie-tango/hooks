import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () =>
  JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
  });

const getServerSnapshot = () => JSON.stringify({ width: 0, height: 0 });

export default function useWindowSize() {
  return JSON.parse(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  ) as { width: number; height: number };
}
