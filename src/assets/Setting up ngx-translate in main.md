# Setting up ngx-translate in main.ts

We have been using ngx-translate with Angular as our go-to i18n solution for a long time.

Previously we imported and configured our Translate module, as well as provided our HttpLoaderFactory function, in `app.module.ts`.

As we move to a complete standalone setup, from version 16 onwards, we now use `main.ts`

## Install ngx-translate

```bash
$ npm install @ngx-translate/core @ngx-translate/http-loader
```

## Provide translation files

We use the default location for ngx-translate translation files, as shown below.

```bash
|── src
|   └── assets
|       └── i18n
|           └── de.json
|           └── en.json
```

In more complex applications we replace the `HttpLoaderFactory` with a `MultipleHttpLoaderFactory` to import and concatenate translation files from more than one location.

We would also include the TranslateModule as part of an `APP_INITIALIZER` to confirm the default translation file and service are available before the application starts.

More on that in a dedicated topic.

## Provide HttpLoaderFactory

```typescript
// ../src/app/shared/utils/HttpLoaderFactory.ts

import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
```

## Import and configure ngx-translate in main.ts

```typescript
// ../src/app/main.ts

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app/routes/app-routes";
import { importProvidersFrom } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "@utils";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(HttpClientModule), // or provideHttpClient() in Angular v15
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          defaultLanguage: "en",
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
});
```

## Using ngx-translate at runtime

```typescript
import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { take } from "rxjs";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // init lang is defaultLanguage from main.ts

    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((change) => {
      // act on lang change event
    });

    this.translate.use("de"); // set lang
  }
}
```
