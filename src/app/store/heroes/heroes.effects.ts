import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HeroesActions} from './heroes.actions';
import {HeroService} from '../../services/hero.service';
import {map, switchMap} from 'rxjs/operators';
import {Hero} from '../../models/hero';

@Injectable()
export class HeroesEffects {
  getHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.getHeroes),
      switchMap(() => this.heroService.getHeroes()),
      map((heroes: Hero[]) => HeroesActions.initHeroesList({heroes}))
    )
  );

  addHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.addHero),
      map(({heroName}) => heroName.trim()),
      switchMap((heroName: string) => this.heroService.addHero({name: heroName} as Hero)),
      map((hero: Hero) => HeroesActions.setHero({hero}))
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.removeHero),
      switchMap(({id}) => this.heroService.deleteHero(id)),
      map((hero: Hero) => HeroesActions.removeHero({id: hero.id}))
    )
  );

  filterHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.searchHeroes),
      switchMap(({query}) => this.heroService.searchHeroes(query)),
      map((heroes: Hero[]) => HeroesActions.updateHeroesFiltered({heroes}))
    )
  );

  constructor(private actions$: Actions, private heroService: HeroService) {
  }
}
