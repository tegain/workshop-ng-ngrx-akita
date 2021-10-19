import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RouterActions } from '../router';

@Injectable()
export class RouterEffects {
  navigateByUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.routerGoByUrl),
        tap(({ path }) => of(this.router.navigateByUrl(path)))
      ),
    { dispatch: false }
  );

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.routerGo),
        tap(({ path, queryParams, extras }) => of(this.router.navigate(path, { queryParams, ...extras })))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
