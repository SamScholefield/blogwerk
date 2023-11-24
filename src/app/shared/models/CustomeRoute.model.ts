import { ICustomRouteData } from './CustomRouteData.model';
import { Route } from '@angular/router';

/**
 * Represents a route in our app.
 */
export interface ICustomRoute extends Route {
  data: ICustomRouteData;
}
