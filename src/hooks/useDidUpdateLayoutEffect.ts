/* eslint-disable react-hooks/exhaustive-deps */

import { useLayoutEffect, useRef, type DependencyList, type EffectCallback } from "react";

/**
 * The signature is identical to `useDidUpdateEffect`, but it fires synchronously after all DOM mutations. Use this to
 * read layout from the DOM and synchronously re-render. Updates scheduled inside `useDidUpdateLayoutEffect` will be
 * flushed synchronously, before the browser has a chance to paint.
 *
 * Unlike `useDidUpdateEffect`, `useDidUpdateLayoutEffect` is not called for the initial render.
 *
 * Prefer the standard `useDidUpdateEffect` when possible to avoid blocking visual updates.
 *
 * @param effect Imperative function that can return a cleanup function.
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @see {@link https://react.dev/reference/react/useLayoutEffect}
 */
export const useDidUpdateLayoutEffect = (effect: EffectCallback, deps?: DependencyList | undefined) => {
  const didUpdate = useRef(false);

  useLayoutEffect(() => {
    if (!didUpdate.current) {
      return void (didUpdate.current = true);
    }

    return effect();
  }, deps);
};
