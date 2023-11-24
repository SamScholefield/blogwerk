# Using destroyRef to control your subscriptions

Previously we used the popular library `@ngneat/until-destroy` to control unsubscribing automatically. Now we can replace the library by using `DestroyRef` from `@angular/core`

```typescript
...
import { DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Service } from "@api/services"

...

export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private service = inject(Service);

  ngOnInit(): void {
    this.service.subscription
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: (res) => {
                console.log(res)
            },
            error: (err) => {
                console.error(err)
            }
        });
  }
}
```
