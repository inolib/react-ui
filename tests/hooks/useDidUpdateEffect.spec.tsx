import { render } from "@testing-library/react";
import { useEffect, useState, type EffectCallback } from "react";
import { expect, it, vi } from "vitest";

import { useDidUpdateEffect } from "../../src/hooks";

const _ = {
  effect: () => undefined,
};

it("should not run the effect on the initial render", () => {
  const MyComponent = ({ effect }: { effect: EffectCallback }) => {
    useDidUpdateEffect(effect, []);

    return <></>;
  };

  const spy = vi.spyOn(_, "effect");

  render(<MyComponent effect={_.effect} />);

  expect(spy).not.toHaveBeenCalled();
});

it("should run the effect on re-render", () => {
  const MyComponent = ({ effect }: { effect: EffectCallback }) => {
    const [didUpdate, setDidUpdate] = useState(false);

    useEffect(() => {
      setDidUpdate(true);
    }, []);

    useDidUpdateEffect(effect, [didUpdate]);

    return <></>;
  };

  const spy = vi.spyOn(_, "effect");

  render(<MyComponent effect={_.effect} />);

  expect(spy).toHaveBeenCalled();
});
