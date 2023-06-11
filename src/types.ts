export type Exclusive<T extends TypeDefinition, U extends TypeDefinition> =
  | (T & { [k in Exclude<keyof U, keyof T>]?: never })
  | (U & { [k in Exclude<keyof T, keyof U>]?: never });

type TypeDefinition = Record<PropertyKey, unknown>;
