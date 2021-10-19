import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HeroesActions} from './heroes.actions';
import {HeroService} from '../../services/hero.service';
import {map, switchMap} from 'rxjs/operators';
import {Hero} from '../../models/hero';
import {Update} from '@ngrx/entity';

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

  putHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.putHero),
      switchMap(({hero}) => this.heroService.updateHero(hero).pipe(map(_ => hero))),
      map((hero: Hero) => ({id: hero.id, changes: {name: hero.name}} as Update<Hero>)),
      map((hero: Update<Hero>) => HeroesActions.updateHero({hero}))
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.deleteHero),
      switchMap(({id}) => this.heroService.deleteHero(id).pipe(map(_ => id))),
      map((id: number) => HeroesActions.removeHero({id}))
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
