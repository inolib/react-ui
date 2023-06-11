import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Menu } from "../../../src/components/Menu";

it("should have the `menuitem` role", async () => {
  render(
    <Menu>
      <Menu.Button>Foo</Menu.Button>
    </Menu>
  );

  expect(await screen.findByRole("menuitem")).toBeInTheDocument();
});
