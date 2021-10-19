import { createAction, props } from '@ngrx/store';
import {Hero} from '../../models/hero';
import {Update} from '@ngrx/entity';

// Call services
const getHeroes = createAction('[Heroes] get heroes list');
const addHero = createAction('[Heroes] add Hero to list', props<{ heroName: string }>());
const putHero = createAction('[Heroes] put Hero', props<{ hero: Hero}>());
const deleteHero = createAction('[Heroes] delete Hero to list', props<{ id: number }>());
const searchHeroes = createAction('[Heroes] search heroes', props<{query: string}>());

// Update Store
const initHeroesList = createAction('[Heroes] initialisation of heroes list', props<{ heroes: Hero[] }>());
const setHero = createAction('[Heroes] set Hero to list', props<{ hero: Hero }>());
const updateHero = createAction('[Heroes] update Hero', props<{ hero: Update<Hero>}>());
const removeHero = createAction('[Heroes] remove Hero to list', props<{ id: number }>());
const updateHeroesFiltered = createAction('[Heroes] set query', props<{heroes: Hero[]}>());

export const HeroesActions = {
  getHeroes,
  addHero,
  putHero,
  deleteHero,
  searchHeroes,
  initHeroesList,
  setHero,
  updateHero,
  removeHero,
  updateHeroesFiltered
};
