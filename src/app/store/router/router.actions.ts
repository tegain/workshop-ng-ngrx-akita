import {NavigationExtras, Params} from '@angular/router';
import { createAction, props } from '@ngrx/store';

const routerGo = createAction('[Router] Go', props<{ path: unknown[]; queryParams?: Params; extras?: NavigationExtras }>());
const routerGoByUrl = createAction('[Router] Go by url', props<{ path: string }>());
const routerChange = createAction('[Router] Route Change', props<{ params: unknown; path: string }>());

export const RouterActions = {
  routerChange,
  routerGoByUrl,
  routerGo
};
