import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterState {
  router: RouterReducerState;
}

export const routerReducers: ActionReducerMap<RouterState> = {
  router: routerReducer
};
