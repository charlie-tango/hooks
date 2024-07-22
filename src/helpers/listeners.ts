const changeListeners = new Map<string, Set<() => void>>();

/**
 * Tigger all subscriptions for a key.
 * @param key
 */
export function trigger(key: string) {
  const listeners = changeListeners.get(key);
  if (listeners) {
    listeners.forEach((callback) => callback());
  }
}

/**
 * Add a simple listener for a key, to trigger a callback function on changes.
 * Trigger updates by calling the `trigger` function.
 *
 * @returns {() => void} A function to unsubscribe
 */
export function addListener(key: string, listener: () => void): () => void {
  if (!changeListeners.has(key)) {
    changeListeners.set(key, new Set());
  }

  const listeners = changeListeners.get(key);
  listeners?.add(listener);

  return () => {
    listeners?.delete(listener);
  };
}
