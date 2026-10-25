import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** `true` on the client after hydration, `false` during server rendering. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
