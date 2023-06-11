import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Section, useSection } from "../../../src/components/Section";

const Level = () => {
  const { level } = useSection();

  return <p>Level: {level}.</p>;
};

it("should have the `region` role", async () => {
  render(<Section aria-label="Foo"></Section>);

  expect(await screen.findByRole("region")).toBeInTheDocument();
});

it("should expose a nesting level of 0 by default", async () => {
  render(<Level />);

  expect(await screen.findByText(/^Level:/)).toHaveTextContent("Level: 0.");
});

it("should expose a nesting level of 1", async () => {
  render(
    <Section>
      <Level />
    </Section>
  );

  expect(await screen.findByText(/^Level:/)).toHaveTextContent("Level: 1.");
});

it("should expose a nesting level of 2", async () => {
  render(
    <Section>
      <Section>
        <Level />
      </Section>
    </Section>
  );

  expect(await screen.findByText(/^Level:/)).toHaveTextContent("Level: 2.");
});
