import { type HTMLAttributes } from "react";

import { useSection } from "./Section";

type Props = Omit<Readonly<HTMLAttributes<HTMLHeadingElement>>, "aria-level" | "role">;

class HeadingError extends Error {}

/**
 * Use this component to add a heading to the document.
 *
 * Generates an `<hx>` element according to the nesting level of its closest parent `Section` component.
 *
 * @example
 *   const MyApp = () => {
 *     return (
 *       <Section aria-labelledby=":r1:">
 *         <Section.Heading id=":r1:">About us</Section.Heading>
 *         ...
 *       </Section>
 *     );
 *   };
 *
 * @param props The props passed to the component.
 * @param props.children The children passed to the component.
 *
 * @returns The JSX element to render.
 *
 * @throws A {@linkcode HeadingError} when the nesting level is less than 1 or greater than 6.
 */
export const Heading = ({ children, ...rest }: Props) => {
  const { level } = useSection();

  switch (level) {
    case 0: {
      throw new HeadingError(`Cannot generate a heading for level ${level}`);
    }

    case 1: {
      return <h1 {...rest}>{children}</h1>;
    }

    case 2: {
      return <h2 {...rest}>{children}</h2>;
    }

    case 3: {
      return <h3 {...rest}>{children}</h3>;
    }

    case 4: {
      return <h4 {...rest}>{children}</h4>;
    }

    case 5: {
      return <h5 {...rest}>{children}</h5>;
    }

    case 6: {
      return <h6 {...rest}>{children}</h6>;
    }

    default: {
      return (
        <div aria-level={level} role="heading" {...rest}>
          {children}
        </div>
      );
    }
  }
};
