import { useEffect } from "react";

let lockCount = 0;

function applyLock(locked: boolean) {
  if (locked) {
    lockCount += 1;
  } else {
    lockCount = Math.max(0, lockCount - 1);
  }
  document.body.classList.toggle("no-scroll", lockCount > 0);
}

/**
 * Adds the `no-scroll` body class while `active` is true. Multiple
 * callers can hold the lock at once (e.g. the welcome intro and the
 * login modal) — the class only clears once everyone releases it.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    applyLock(true);
    return () => applyLock(false);
  }, [active]);
}
