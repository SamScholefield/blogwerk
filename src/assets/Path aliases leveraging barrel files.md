# Path aliases and leveraging barrel files

We generally like to store things likes `consts`, `enums` and `models` in separate files within a dedicated folder in a `shared` directory, based on their type. A simplified example is given below:

```
|── src
|   └── app
│       └── shared
│           └── enums
|               └── FormMode.enum.ts
|               └── Role.enum.ts
```

Normally, this would lead to the following:

```typescript
// any.component.ts

import { FormMode } from "../src/app/shared/enums/FormMode.enum";
import { Role } from "../src/app/shared/enums/Role.enum";
```

If we extrapolate this example out to the usual amount of imports in a production application we can see that it can rapidly become busy and hard to read.

In this topic we will create a simpler importing method with a much cleaner syntax.

## Creating index.ts

We create an `index.ts` file in the `enums` folder to act as a global exporter.

```
│── shared
│   └── enums
|       └── FormMode.enum.ts
|       └── index.ts
|       └── Role.enum.ts
```

The contents of `index.ts`:

```typescript
// ../src/app/shared/enums/index.ts

export * from "./FormMode.enum";
export * from "./Role.enum";
```

The one-time creation of an individual `index.ts` file per folder and then the writing of any subsequent export lines are the only changes required when using the barrel file workflow.

```typescript
// any.component.ts

import { FormMode, Role } from "../src/app/shared/enums";
```

So, this is looking better. Now we can import all enums from a single path.

However, we can improve this further by using a path alias. a one-time change in `tsconfig.json`.

## Setting a path alias

```json
// ../tsconfig.json

{
  ...
  "compilerOptions": {
   ...
    "paths": {
      "@enums": ["./src/app/shared/enums"],
    }
  },
...
}
```

## Using the alias

We can now import all enums from a single aliased location.

```typescript
// any.component.ts

import { FormMode, Role } from "@enums";
```
