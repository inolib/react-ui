import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { Menu } from "../../../src/components/Menu";

it("should have the `menu` role", async () => {
  render(<Menu />);

  expect(await screen.findByRole("menu")).toBeInTheDocument();
});

it("should not be focusable", async () => {
  render(<Menu />);

  expect(await screen.findByRole("menu")).toHaveAttribute("tabindex", "-1");
});

it("should correctly set the `aria-activedescendant` attribute", async () => {
  render(
    <Menu>
      <Menu.Button>First</Menu.Button>
      <Menu.Button>Second</Menu.Button>
      <Menu.Button>Third</Menu.Button>
    </Menu>
  );

  const third = await screen.findByText("Third");

  const user = userEvent.setup();
  await user.click(third);

  expect(await screen.findByRole("menu")).toHaveAttribute("aria-activedescendant", third.id);
});

it("should correctly set the `aria-orientation` attribute", async () => {
  for (const orientation of ["horizontal", "vertical"] as const) {
    render(<Menu orientation={orientation} />);

    expect(await screen.findByRole("menu")).toHaveAttribute("aria-orientation", orientation);

    cleanup();
  }

  render(<Menu orientation={undefined} />);

  expect(await screen.findByRole("menu")).not.toHaveAttribute("aria-orientation");
});
