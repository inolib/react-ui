import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { expect, it, vi } from "vitest";

import { Composite, useComposite } from "../../src/components/Composite";

const Button = ({ children }: PropsWithChildren) => {
  const { addRef } = useComposite();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addRef(ref);
  }, [addRef]);

  return <button ref={ref}>{children}</button>;
};

it("should throw an error when `orientation` is undefined and `role` does not have an implicit `aria-orientation` value", () => {
  expect(() => render(<Composite role="none" />)).toThrow(
    "Cannot determine navigation orientation, 'aria-orientation' is undefined and 'role' does not have an implicit " +
      "'aria-orientation' value."
  );
});

it("should set the first navigable descendant as the only focusable element by default", async () => {
  render(
    <Composite orientation="horizontal">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Composite>
  );

  expect(await screen.findByText("First")).toHaveAttribute("tabindex", "0");
  expect(await screen.findByText("Second")).toHaveAttribute("tabindex", "-1");
  expect(await screen.findByText("Third")).toHaveAttribute("tabindex", "-1");
});

it("should set the navigable descendant indexed with `initialIndex` as the only focusable element", async () => {
  render(
    <Composite initialIndex={1} orientation="horizontal">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Composite>
  );

  expect(await screen.findByText("First")).toHaveAttribute("tabindex", "-1");
  expect(await screen.findByText("Second")).toHaveAttribute("tabindex", "0");
  expect(await screen.findByText("Third")).toHaveAttribute("tabindex", "-1");
});

it("should handle mouse on `click`", async () => {
  render(
    <Composite orientation="horizontal">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Composite>
  );

  const third = await screen.findByText("Third");

  const user = userEvent.setup();
  await user.click(third);

  expect(await screen.findByText("First")).toHaveAttribute("tabindex", "-1");
  expect(await screen.findByText("Second")).toHaveAttribute("tabindex", "-1");

  expect(third).toHaveAttribute("tabindex", "0");
  expect(third).toHaveFocus();
});

it("should handle keyboard navigation on `ArrowRight` and `ArrowLeft` in a horizontally oriented widget", async () => {
  render(
    <Composite orientation="horizontal">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Composite>
  );

  const first = await screen.findByText("First");
  const second = await screen.findByText("Second");
  const third = await screen.findByText("Third");

  const user = userEvent.setup();
  await user.keyboard("[Tab][ArrowRight>3/]");

  expect(first).toHaveAttribute("tabindex", "-1");
  expect(second).toHaveAttribute("tabindex", "-1");

  expect(third).toHaveAttribute("tabindex", "0");
  expect(third).toHaveFocus();

  await user.keyboard("[ArrowLeft>3/]");

  expect(first).toHaveAttribute("tabindex", "0");
  expect(first).toHaveFocus();

  expect(second).toHaveAttribute("tabindex", "-1");
  expect(third).toHaveAttribute("tabindex", "-1");
});

it("should handle keyboard navigation on `ArrowDown` and `ArrowUp` in a vertically oriented widget", async () => {
  render(
    <Composite orientation="vertical">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Composite>
  );

  const first = await screen.findByText("First");
  const second = await screen.findByText("Second");
  const third = await screen.findByText("Third");

  const user = userEvent.setup();
  await user.keyboard("[Tab][ArrowDown>3/]");

  expect(first).toHaveAttribute("tabindex", "-1");
  expect(second).toHaveAttribute("tabindex", "-1");

  expect(third).toHaveAttribute("tabindex", "0");
  expect(third).toHaveFocus();

  await user.keyboard("[ArrowUp>3/]");

  expect(first).toHaveAttribute("tabindex", "0");
  expect(first).toHaveFocus();

  expect(second).toHaveAttribute("tabindex", "-1");
  expect(third).toHaveAttribute("tabindex", "-1");
});

it("should infer horizontal keyboard navigation for roles having an implicit `aria-orientation` value", async () => {
  for (const role of ["menubar", "separator", "slider", "tablist", "toolbar"] as const) {
    render(
      <Composite role={role}>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Composite>
    );

    const first = await screen.findByText("First");
    const second = await screen.findByText("Second");
    const third = await screen.findByText("Third");

    const user = userEvent.setup();
    await user.keyboard("[Tab][ArrowRight>3/]");

    expect(first).toHaveAttribute("tabindex", "-1");
    expect(second).toHaveAttribute("tabindex", "-1");

    expect(third).toHaveAttribute("tabindex", "0");
    expect(third).toHaveFocus();

    cleanup();
  }
});

it("should infer vertical keyboard navigation for roles having an implicit `aria-orientation` value", async () => {
  for (const role of ["listbox", "menu", "scrollbar", "tree"] as const) {
    render(
      <Composite role={role}>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Composite>
    );

    const first = await screen.findByText("First");
    const second = await screen.findByText("Second");
    const third = await screen.findByText("Third");

    const user = userEvent.setup();
    await user.keyboard("[Tab][ArrowDown>3/]");

    expect(first).toHaveAttribute("tabindex", "-1");
    expect(second).toHaveAttribute("tabindex", "-1");

    expect(third).toHaveAttribute("tabindex", "0");
    expect(third).toHaveFocus();

    cleanup();
  }
});

it("should call `onFocus` callback when the navigable descendant gets focused", async () => {
  const _ = {
    callback: () => undefined,
  };

  const spy = vi.spyOn(_, "callback");

  render(
    <Composite onFocus={_.callback} orientation="horizontal">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Composite>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText("Third"));

  expect(spy).toHaveBeenCalled();
});
