import {createFeatureSelector, createSelector} from '@ngrx/store';

import {heroAdapter, HeroesFeatureKey, HeroesState} from './heroes.reducer';
import {Hero} from '../../models/hero';
import {selectRouteParam} from '../router';

const heroesListState = createFeatureSelector<HeroesState>(HeroesFeatureKey);
const heroesSelectors = heroAdapter.getSelectors();

// @ts-ignore
const heroesState = createSelector(heroesListState, (state: HeroesState) => state.heroes);
const heroes = createSelector(heroesState, heroesSelectors.selectAll);

// @ts-ignore
const heroesFiltered = createSelector(heroesListState, (state: HeroesState) => state.heroesFiltered);

const heroByRouteParamSelector = createSelector(
  heroes,
  selectRouteParam('id'),
  (heroesList: Hero[], id: string | undefined): Hero | null | undefined => {
    // const id = '1';
    let heroesResult;
    if (!!id) {
      heroesResult = heroesList.find((hero: Hero) => hero.id === parseInt(id, 10));
    }
    return heroesResult || null;
  }
);

export const HeroesSelectors = {
  heroes,
  heroByRouteParamSelector,
  heroesFiltered
};
