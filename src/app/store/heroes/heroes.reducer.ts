import {createReducer, on} from '@ngrx/store';
import {HeroesActions} from './heroes.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Hero} from '../../models/hero';

export const HeroesFeatureKey = 'heroes';
export type HeroesStateType = EntityState<Hero>;

export const heroAdapter = createEntityAdapter<Hero>();

export interface HeroesState {
  heroes: HeroesStateType;
  heroesFiltered: Hero[];
}

const initialState: HeroesState = {
  heroes: heroAdapter.getInitialState([]),
  heroesFiltered: []
};

export const heroesReducers = createReducer(
  initialState,
  on(HeroesActions.initHeroesList, (state, {heroes}) => ({
    ...state,
    heroes: {...heroAdapter.setAll(heroes, state.heroes)}
  })),
  on(HeroesActions.setHero, (state, {hero}) => ({
    ...state,
    heroes: {...heroAdapter.setOne(hero, state.heroes)}
  })),
  on(HeroesActions.updateHero, (state, {hero}) => ({
    ...state,
    heroes: {...heroAdapter.updateOne(hero, state.heroes)}
  })),
  on(HeroesActions.removeHero, (state, {id}) => ({
    ...state,
    heroes: {...heroAdapter.removeOne(id, state.heroes)}
  })),
  on(HeroesActions.updateHeroesFiltered, (state, {heroes}) => ({
    ...state,
    heroesFiltered: heroes
  }))
);
