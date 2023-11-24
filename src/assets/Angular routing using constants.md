# Angular routing using constants

When developing a complex Angular application we have found that exporting routing path constants from a public static class member works well.

These constants can then easily be accessed throughout the application in both templates and controllers and eliminates paths being defined by magic strings.

This approach also improves readability, allows simpler maintenance and really demonstrates it's benefit when faced with a large scale refactoring of the applications structure and routing.

## Creating the constants

First we create a public static member of the APP_PATHS class. This will then be available anywhere in the application without the need to instantiate the APP_PATHS class itself.

```typescript
// ../src/app/routes/app-paths.ts

export class APP_PATHS {
  public static FEATURE = {
    ROOT: "/",
    MAIN: "main",
    FORM: "form",
    DIALOG: "dialog",
  };
  public static SECTION = {
    OVERVIEW: "overview",
    CREATE: "create",
    EDIT: "edit",
  };
}
```

## Using the constants in your routing document

Next, we create our routing document defining the path strings using the constants from our APP_PATHS class.

```typescript
// ../src/app/routes/app-routes.ts

import { Routes } from "@angular/router";
import { FormComponent } from "../form/form.component";
import { MainComponent } from "../main/main.component";
import { DialogComponent } from "../dialog/dialog.component";
import { APP_PATHS } from "./app-paths";

export const APP_ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: APP_PATHS.FEATURE.MAIN,
  },
  {
    path: APP_PATHS.FEATURE.MAIN,
    component: MainComponent,
    children: [
      {
        path: APP_PATHS.FEATURE.MAIN + "/:userId",
        component: FormComponent,
        data:{
          formMode: FormMode.
        }
      },
    ],
  },
];
```

## Using the constants in controllers and templates

Finally, we can see how to use the constants from the APP_PATHS class in our controllers, for programmatic navigation, as well as directly in our template.

```typescript
// app.component.ts

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { APP_PATHS } from "./routes/app-paths";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private router = inject(Router);
  public appPaths = APP_PATHS; // make available in template

  private navigateToRoot(): void {
    this.router.navigate([APP_PATHS.FEATURE.ROOT]); // navigate programmatically
  }
}
```

```html
<!-- app.component.html -->

<div class="app">
  <nav>
    <a [routerLink]="appPaths.FEATURE.MAIN">MAIN</a>
    <a [routerLink]="appPaths.FEATURE.FORM">FORM</a>
    <a [routerLink]="appPaths.FEATURE.DIALOG">DIALOG</a>
  </nav>
  <div class="main-content">
    <router-outlet></router-outlet>
  </div>
</div>
```
