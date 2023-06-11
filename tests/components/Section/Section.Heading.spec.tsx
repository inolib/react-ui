import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Section } from "../../../src/components/Section";

it("should throw an error when used outside of a `Section` component", () => {
  expect(() => render(<Section.Heading>Level 0</Section.Heading>)).toThrow("Cannot generate a heading for level 0");
});

it("should render an `<h1>` element", async () => {
  render(
    <Section>
      <Section.Heading>Level 1</Section.Heading>
    </Section>
  );

  const heading = await screen.findByText("Level 1");
  expect(heading.tagName).toBe("H1");
});

it("should render two `<h1>` elements", async () => {
  render(
    <Section>
      <Section.Heading>Level 1 (1)</Section.Heading>
      <Section.Heading>Level 1 (2)</Section.Heading>
    </Section>
  );

  const heading1 = await screen.findByText("Level 1 (1)");
  expect(heading1.tagName).toBe("H1");

  const heading2 = await screen.findByText("Level 1 (2)");
  expect(heading2.tagName).toBe("H1");
});

it("should render an `<h2>` element", async () => {
  render(
    <Section>
      <Section>
        <Section.Heading>Level 2</Section.Heading>
      </Section>
    </Section>
  );

  const heading = await screen.findByText("Level 2");
  expect(heading.tagName).toBe("H2");
});

it("should render an `<h3>` element", async () => {
  render(
    <Section>
      <Section>
        <Section>
          <Section.Heading>Level 3</Section.Heading>
        </Section>
      </Section>
    </Section>
  );

  const heading = await screen.findByText("Level 3");
  expect(heading.tagName).toBe("H3");
});

it("should render an `<h4>` element", async () => {
  render(
    <Section>
      <Section>
        <Section>
          <Section>
            <Section.Heading>Level 4</Section.Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );

  const heading = await screen.findByText("Level 4");
  expect(heading.tagName).toBe("H4");
});

it("should render an `<h5>` element", async () => {
  render(
    <Section>
      <Section>
        <Section>
          <Section>
            <Section>
              <Section.Heading>Level 5</Section.Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );

  const heading = await screen.findByText("Level 5");
  expect(heading.tagName).toBe("H5");
});

it("should render an `<h6>` element", async () => {
  render(
    <Section>
      <Section>
        <Section>
          <Section>
            <Section>
              <Section>
                <Section.Heading>Level 6</Section.Heading>
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );

  const heading = await screen.findByText("Level 6");
  expect(heading.tagName).toBe("H6");
});

it("should render an `<hx>` element for the first six levels", async () => {
  render(
    <Section>
      <Section.Heading>Level 1</Section.Heading>
      <Section>
        <Section.Heading>Level 2</Section.Heading>
        <Section>
          <Section.Heading>Level 3</Section.Heading>
          <Section>
            <Section.Heading>Level 4</Section.Heading>
            <Section>
              <Section.Heading>Level 5</Section.Heading>
              <Section>
                <Section.Heading>Level 6</Section.Heading>
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );

  const heading1 = await screen.findByText("Level 1");
  expect(heading1.tagName).toBe("H1");

  const heading2 = await screen.findByText("Level 2");
  expect(heading2.tagName).toBe("H2");

  const heading3 = await screen.findByText("Level 3");
  expect(heading3.tagName).toBe("H3");

  const heading4 = await screen.findByText("Level 4");
  expect(heading4.tagName).toBe("H4");

  const heading5 = await screen.findByText("Level 5");
  expect(heading5.tagName).toBe("H5");

  const heading6 = await screen.findByText("Level 6");
  expect(heading6.tagName).toBe("H6");
});

it("should have the `heading` role with an `aria-level` value of `7`", async () => {
  render(
    <Section>
      <Section>
        <Section>
          <Section>
            <Section>
              <Section>
                <Section>
                  <Section.Heading>Level 7</Section.Heading>
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );

  expect(await screen.findByRole("heading")).toHaveAttribute("aria-level", "7");
});
