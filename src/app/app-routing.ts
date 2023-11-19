import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MainComponent } from './main/main.component';
import { DialogComponent } from './dialog/dialog.component';

// path constants
export class APP_PATHS {
  public static FEATURE = {
    MAIN: 'main',
    FORM: 'form',
    DIALOG: 'dialog',
  };
}

// routes
export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_PATHS.FEATURE.MAIN,
  },
  {
    path: APP_PATHS.FEATURE.MAIN,
    component: MainComponent,
  },
  {
    path: APP_PATHS.FEATURE.FORM,
    component: FormComponent,
  },
  {
    path: APP_PATHS.FEATURE.DIALOG,
    component: DialogComponent,
  },
];
