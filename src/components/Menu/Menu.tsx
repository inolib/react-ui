import { useReducer, type HTMLAttributes } from "react";

import { Composite } from "../Composite";
import { Button } from "./Button";

type Attributes = HTMLAttributes<HTMLUListElement>;

type Props = Omit<Readonly<Attributes>, "aria-activedescendant" | "aria-orientation" | "role" | "tabIndex"> & {
  readonly orientation?: Attributes["aria-orientation"];
};

type State = {
  readonly activeDescendant: string;
};

/**
 * Handles `focus` events.
 *
 * @param state The internal state of the {@linkcode Menu} component.
 * @param event The dispateched event.
 *
 * @returns The updated internal state.
 */
const reducer = (state: State, event: FocusEvent) => {
  return { ...state, activeDescendant: (event.target as HTMLElement).id };
};

/**
 * Use this component to add a menu widget to the document.
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
 * @param props.orientation The value of the widget’s `aria-orientation attribute.`
 *
 * @returns The JSX element to render.
 *
 * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-orientation}
 */
export const Menu = ({ children, orientation, ...rest }: Props) => {
  const [state, dispatch] = useReducer(
    reducer,
    Object.freeze({
      activeDescendant: "",
    })
  );

  return (
    <ul
      aria-activedescendant={state.activeDescendant}
      aria-orientation={orientation}
      role="menu"
      tabIndex={-1}
      {...rest}
    >
      <Composite onFocus={dispatch} orientation={orientation} role="menu">
        {children}
      </Composite>
    </ul>
  );
};

Menu.Button = Button;
