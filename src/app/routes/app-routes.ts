import { Routes } from '@angular/router';
import { FormComponent } from '../features/form/form.component';
import { MainComponent } from '../features/main/main.component';
import { DialogComponent } from '../features/dialog/dialog.component';
import { APP_PATHS } from './app-paths';
import { FormMode } from '@enums';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_PATHS.FEATURE.MAIN,
  },
  {
    path: APP_PATHS.FEATURE.MAIN,
    component: MainComponent,
    children: [
      {
        path: APP_PATHS.SECTION.CREATE,
        component: FormComponent,
        data: {
          formMode: FormMode.CREATE,
        },
      },
    ],
  },
  {
    path: APP_PATHS.FEATURE.MAIN + '/' + ':userId',
    component: MainComponent,
    children: [
      {
        path: APP_PATHS.SECTION.EDIT,
        component: FormComponent,
        data: {
          formMode: FormMode.EDIT,
        },
      },
    ],
  },
  {
    path: APP_PATHS.FEATURE.DIALOG,
    component: DialogComponent,
  },
];
