import { Data } from '@angular/router';
import { Role, FormMode } from '@enums';

/**
 * Additional data necessary/supported on our app routes
 * Extends the default type of Angular to be more prescriptive
 */
export interface ICustomRouteData extends Data {
  /**
   * Roles that are allowed to access this route.
   * Empty array means all roles are allowed
   */
  breadcrumb: string | null;
  roles: Role[] | null;
  formMode?: FormMode;
}
