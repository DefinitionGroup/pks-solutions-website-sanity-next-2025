import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// True after hydration, false during server render; avoids setState-in-effect for theme-dependent UI
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
