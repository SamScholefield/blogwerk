# Typing Angular routes data property

Angular route definitions by default accept a data property:

```typescript
export declare type Data = {
  [key: string | symbol]: any;
};
```

We would like to provide a more typesafe version of the data property and to do so we can apply the following:

```typescript
// CustomeRouteData.model.ts

import { Data } from "@angular/router";
import { Role, FormMode } from "@enums";

export interface ICustomRouteData extends Data {
  breadcrumb: string | null;
  roles: Role[] | null;
  formMode?: FormMode;
}
```

```typescript
// CustomeRoute.model.ts

import { ICustomRouteData } from "@models";
import { Route } from "@angular/router";

export interface ICustomRoute extends Route {
  data: ICustomRouteData;
}
```

```typescript
// app-routing.ts

import { APP_PATHS } from "./app-paths";
import { Role } from "@enums";
import { ICustomRoute } from "@models";

export type CustomRouting = ICustomRoute[];

const APP_ROUTES: CustomRouting = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: APP_PATHS.FEATURE.MAIN,
    data: {
      breadcrumb: null,
      roles: null,
    },
  },
  {
    path: APP_PATHS.FEATURE.MAIN,
    component: MainComponent,
    data: {
      breadcrumb: FormMode.CREATE,
      roles: [Role.ADMIN],
      formMode: FormMode.CREATE,
    },
  },
];
```
