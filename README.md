# React project setup

## Development

### package.json

```jsonc
// package.json
{
  // ...
  "type": "module"
}
```

### ESLint

```text
pnpm add --dev eslint
```

```text
# .eslintignore
/coverage/
/node_modules/

!/.config/
!/**/*.cjs
```

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    // ...
  ],
  env: {
    browser: true,
    node: true,
    // ...
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      // ...
    },
    ecmaVersion: "latest",
    sourceType: "module",
    // ...
  },
  // ...
};
```

#### Integration to package.json

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "lint:eslint": "eslint --ext .cjs,.ts,.tsx ."
  }
}
```

#### Integration with Visual Studio Code

```jsonc
// .vscode/settings.json
{
  // ...
  "javascript.validate.enable": false,
  "typescript.validate.enable": false
}
```

#### Plugins (optional)

##### eslint-plugin-jsdoc

```text
pnpm add --dev eslint-plugin-jsdoc
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    "plugin:jsdoc/recommended-typescript",
    // ...
  ],
  // ...
};
```

##### eslint-plugin-jsx-a11y

```text
pnpm add --dev eslint-plugin-jsx-a11y
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    "plugin:jsx-a11y/recommended",
    // ...
  ],
  // ...
};
```

##### eslint-plugin-markdown

```text
pnpm add --dev eslint-plugin-markdown
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    "plugin:markdown/recommended",
    // ...
  ],
  // ...
};
```

### Prettier

```text
pnpm add --dev prettier
```

```text
# .prettierignore
/coverage/
/node_modules/
/pnpm-lock.yaml
```

```javascript
// .prettierrc.cjs
module.exports = {
  pluginSearchDirs: false,
  printWidth: 120,
  // ...
};
```

#### Integration to package.json

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "format:prettier": "prettier --write ."
  }
}
```

#### Integration with ESLint

```text
pnpm add --dev eslint-config-prettier
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    // ...
    "prettier", // must be the last entry
  ],
  // ...
};
```

#### Plugins (optional)

##### prettier-plugin-jsdoc

```text
pnpm add --dev prettier-plugin-jsdoc
```

```javascript
// .config/prettier/.prettierrc.jsdoc.cjs
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
module.exports = {
  ...require("../../.prettierrc.cjs"),
  plugins: [require("prettier-plugin-jsdoc")],
  jsdocKeepUnParseAbleExampleIndent: true,
  jsdocSeparateTagGroups: true,
};
```

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "format:jsdoc": "prettier --config ./.config/prettier/.prettierrc.jsdoc.cjs --write ./**/*.cjs ./**/*.ts ./**/*.tsx"
  }
}
```

###### Integration with ESLint

```jsonc
// .config/tsc/tsconfig.eslint.cjs
{
  // ...
  "files": [
    // ...
    "../prettier/.prettierrc.jsdoc.cjs"
  ]
}
```

##### prettier-plugin-jsxattribute-sort

```text
pnpm add --dev prettier-plugin-jsxattribute-sort
```

```javascript
// .config/prettier/.prettierrc.jsxattribute-sort.cjs
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
module.exports = {
  ...require("../../.prettierrc.cjs"),
  plugins: [require("prettier-plugin-jsxattribute-sort")],
};
```

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "format:jsxattribute-sort": "prettier --config ./.config/prettier/.prettierrc.jsxattribute-sort.cjs --write ./**/*.tsx"
  }
}
```

###### Integration with ESLint

```jsonc
// .config/tsc/tsconfig.eslint.cjs
{
  // ...
  "files": [
    // ...
    "../prettier/.prettierrc.jsxattribute-sort.cjs"
  ]
}
```

##### prettier-plugin-packagejson

```text
pnpm add --dev prettier-plugin-packagejson
```

```javascript
// .config/prettier/.prettierrc.packagejson.cjs
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
module.exports = {
  ...require("../../.prettierrc.cjs"),
  plugins: [require("prettier-plugin-packagejson")],
};
```

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "format:packagejson": "prettier --config ./.config/prettier/.prettierrc.packagejson.cjs --write ./package.json"
  }
}
```

###### Integration with ESLint

```jsonc
// .config/tsc/tsconfig.eslint.cjs
{
  // ...
  "files": [
    // ...
    "../prettier/.prettierrc.packagejson.cjs"
  ]
}
```

##### @ianvs/prettier-plugin-sort-imports

```text
pnpm add --dev @ianvs/prettier-plugin-sort-imports
```

```javascript
// .config/prettier/.prettierrc.sort-imports.cjs
/* eslint-disable @typescript-eslint/no-unsafe-assignment, jsdoc/check-tag-names */
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  ...require("../../.prettierrc.cjs"),
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
  importOrder: ["", "<BUILTIN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^\\."],
  importOrderTypeScriptVersion: "5.0.0",
};
```

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "format:sort-imports": "prettier --config ./.config/prettier/.prettierrc.sort-imports.cjs --write ./**/*.ts ./**/*.tsx"
  }
}
```

###### Integration with ESLint

```jsonc
// .config/tsc/tsconfig.eslint.cjs
{
  // ...
  "files": [
    // ...
    "../prettier/.prettierrc.sort-imports.cjs"
  ]
}
```

### React

```text
pnpm add react react-dom
pnpm add --dev @types/react @types/react-dom
```

#### Integration with ESLint

```text
pnpm add --dev eslint-plugin-react eslint-plugin-react-hooks
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    // ...
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // ...
  },
  settings: {
    react: {
      version: "detect",
      // ...
    },
    // ...
  },
  // ...
};
```

#### Integration with Vite

```text
pnpm add --dev @vitejs/plugin-react
```

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// ...

export default defineConfig({
  plugins: [
    react(),
    // ...
  ],
  // ...
});
```

### TypeScript

```text
pnpm add --dev typescript
```

```jsonc
// tsconfig.json
{
  // ...
  "include": ["."],
  "compilerOptions": {
    // ...
    "esModuleInterop": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "lib": ["DOM", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "verbatimModuleSyntax": true
  }
}
```

#### Integration to package.json

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "lint:tsc": "tsc"
  }
}
```

#### Integration with ESLint

```text
pnpm add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // ...
  ],
  parserOptions: {
    project: ["./.config/tsc/tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
    // ...
  },
  // ...
};
```

```jsonc
// .config/tsc/tsconfig.eslint.json
{
  // ...
  "extends": "../../tsconfig.json",
  "files": [
    // ...
    "../../.eslintrc.cjs",
    "../../.prettierrc.cjs"
  ]
}
```

#### Integration with Vite

```text
pnpm add --dev vite-tsconfig-paths
```

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// ...

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    // ...
  ],
  // ...
});
```

#### Integration with Visual Studio Code

```jsonc
// .vscode/settings.json
{
  // ...
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

### Vite

```text
pnpm add --dev vite
```

```typescript
// vite.config.ts
import { defineConfig } from "vite";
// ...

export default defineConfig({
  // ...
});
```

#### Integration to package.json

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "serve:dev": "vite"
  }
}
```

## Testing

### Testing Library

```text
pnpm add --dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/testing-library__jest-dom
```

#### Integration with ESLint

```text
pnpm add --dev eslint-plugin-testing-library
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    "plugin:testing-library/react",
    // ...
  ],
  // ...
};
```

#### Integration with Vitest

```typescript
// tests/setup.ts
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";

beforeAll(() => {
  const consoleError = console.error;

  vi.spyOn(console, "error").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
    if (
      typeof message !== "string" ||
      !message.includes("Consider adding an error boundary to your tree to customize error handling behavior.")
    ) {
      consoleError(message, ...optionalParams);
    }
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

expect.extend(matchers);
```

### Vitest

```text
pnpm add --dev @vitest/coverage-v8 happy-dom vitest
```

#### Integration to package.json

```jsonc
// package.json
{
  // ...
  "scripts": {
    // ...
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

#### Integration with Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
// ...

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles: "./tests/setup.ts",
    // ...
  },
  // ...
});
```

## Summary

### package.json

```jsonc
// package.json
{
  // ...
  "type": "module",
  "scripts": {
    "format": "pnpm run format:prettier && pnpm run format:jsdoc && pnpm run format:jsxattribute-sort && pnpm run format:packagejson && pnpm run format:sort-imports",
    "format:jsdoc": "prettier --config ./.config/prettier/.prettierrc.jsdoc.cjs --write ./**/*.cjs ./**/*.ts ./**/*.tsx",
    "format:jsxattribute-sort": "prettier --config ./.config/prettier/.prettierrc.jsxattribute-sort.cjs --write ./**/*.tsx",
    "format:packagejson": "prettier --config ./.config/prettier/.prettierrc.packagejson.cjs --write ./package.json",
    "format:prettier": "prettier --write .",
    "format:sort-imports": "prettier --config ./.config/prettier/.prettierrc.sort-imports.cjs --write ./**/*.ts ./**/*.tsx",
    "lint": "pnpm run lint:eslint && pnpm run lint:tsc",
    "lint:eslint": "eslint --ext .cjs,.ts,.tsx .",
    "lint:tsc": "tsc",
    "serve:dev": "vite",
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### ESLint

```text
pnpm add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-jsdoc eslint-plugin-jsx-a11y eslint-plugin-markdown eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-testing-library
```

```text
# .eslintignore
/coverage/
/node_modules/

!/.config/
!/**/*.cjs
```

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jsdoc/recommended-typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:markdown/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    project: ["./.config/tsc/tsconfig.eslint.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

```jsonc
// .config/tsc/tsconfig.eslint.json
{
  "extends": "../../tsconfig.json",
  "files": [
    "../../.eslintrc.cjs",
    "../../.prettierrc.cjs",
    "../prettier/.prettierrc.jsdoc.cjs",
    "../prettier/.prettierrc.jsxattribute-sort.cjs",
    "../prettier/.prettierrc.packagejson.cjs",
    "../prettier/.prettierrc.sort-imports.cjs"
  ]
}
```

### Prettier

```text
pnpm add --dev prettier
```

```text
# .prettierignore
/coverage/
/node_modules/
/pnpm-lock.yaml
```

```javascript
// .prettierrc.cjs
module.exports = {
  pluginSearchDirs: false,
  printWidth: 120,
};
```

### React

```text
pnpm add react react-dom
pnpm add --dev @types/react @types/react-dom
```

### Testing Library

```text
pnpm add --dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/testing-library__jest-dom
```

### TypeScript

```text
pnpm add --dev typescript
```

```jsonc
// tsconfig.json
{
  "include": ["."],
  "compilerOptions": {
    "esModuleInterop": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "lib": ["DOM", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "verbatimModuleSyntax": true
  }
}
```

### Vite

```text
pnpm add --dev vite
```

```typescript
// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "happy-dom",
    setupFiles: "./tests/setup.ts",
  },
});
```

### Vitest

```text
pnpm add --dev @vitest/coverage-v8 happy-dom vitest
```

```typescript
// tests/setup.ts
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";

beforeAll(() => {
  const consoleError = console.error;

  vi.spyOn(console, "error").mockImplementation((message?: unknown, ...optionalParams: unknown[]) => {
    if (
      typeof message !== "string" ||
      !message.includes("Consider adding an error boundary to your tree to customize error handling behavior.")
    ) {
      consoleError(message, ...optionalParams);
    }
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

expect.extend(matchers);
```

### Visual Studio Code

```jsonc
// .vscode/settings.json
{
  "javascript.validate.enable": false,
  "typescript.tsdk": "./node_modules/typescript/lib",
  "typescript.validate.enable": false
}
```
