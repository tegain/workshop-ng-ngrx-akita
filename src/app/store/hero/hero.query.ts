import { Injectable } from '@angular/core';
import { combineQueries, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroesState, HeroStore } from './hero.store';

@Injectable({ providedIn: 'root' })
export class HeroQuery extends QueryEntity<HeroesState> {

  constructor (public readonly store: HeroStore) {
    super(store);
  }

  heroes$: Observable<Hero[]> = this.selectAll();

  activeHero$: Observable<Hero | null> = this.select((state) => state.activeHero);

  /**
   * Remote search
   */
  filteredHeroes$: Observable<Hero[]> = this.select(state => state.filteredHeroes);

  /**
   * Local search
   */
  // filterQuery$ = this.select((state) => state.ui.filter)
  //
  // filteredHeroes$: Observable<Hero[]> = combineQueries([this.filterQuery$, this.selectAll()]).pipe(
  //   map(([query, heroes]: [string | null, Hero[]]) => {
  //     if (!query) {
  //       return heroes;
  //     }
  //     return heroes.filter((hero) => hero.name.includes(query));
  //   })
  // )

}
