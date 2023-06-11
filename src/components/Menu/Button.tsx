import { useEffect, useId, useRef, type ButtonHTMLAttributes } from "react";

import { useComposite } from "../Composite";

type Props = Omit<Readonly<ButtonHTMLAttributes<HTMLButtonElement>>, "id" | "role">;

/**
 * Use this component to add a button to the menu widget.
 *
 * @example
 *   const MyApp = () => {
 *     return (
 *       <Menu orientation="horizontal">
 *         <Menu.Button>Update</Menu.Button>
 *         <Menu.Button>Delete</Menu.Button>
 *       </Menu>
 *     );
 *   };
 *
 * @param props The props passed to the component.
 * @param props.children The children passed to the component.
 *
 * @returns The JSX element to render.
 */
export const Button = ({ children, ...rest }: Props) => {
  const { addRef } = useComposite();
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addRef(ref);
  }, [addRef]);

  return (
    <li role="none">
      <button id={id} ref={ref} role="menuitem" {...rest}>
        {children}
      </button>
    </li>
  );
};
