import { createContext, useContext, type HTMLAttributes } from "react";

import { Heading } from "./Heading";

type Props = Readonly<HTMLAttributes<HTMLElement>>;

type State = {
  level: number;
};

const SectionContext = createContext<State>({ level: 0 });

/**
 * Use this hook to get a reference to the nesting level of the closest parent {@linkcode Section} component.
 *
 * @example
 *   const MyComponent = () => {
 *     const { level } = useSection();
 *     ...
 *     return <p>This paragraph is inside a level {level} section.</p>;
 *   }
 *
 * @returns An object providing `level`.
 *
 * @see {@linkcode Section} component
 */
export const useSection = () => {
  return useContext(SectionContext);
};

/**
 * Use this component to add a section to the document.
 *
 * Every section keeps a reference to its nesting level, you can access this level by using the {@linkcode useSection}
 * hook.
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
 * @see {@linkcode useSection} hook
 */
export const Section = ({ children, ...rest }: Props) => {
  const { level } = useSection();

  return (
    <section {...rest}>
      <SectionContext.Provider value={{ level: level + 1 }}>{children}</SectionContext.Provider>
    </section>
  );
};

Section.Heading = Heading;
