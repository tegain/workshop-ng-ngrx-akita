import { EntityState, EntityStore } from '@datorama/akita';
import { Hero } from '../../hero';

export interface HeroesState extends EntityState<Hero> {
  activeHero: Hero | null;
  filteredHeroes: Hero[];
  ui: {
    filter: string | null;
  }
}

function createInitialState (): HeroesState {
  return {
    activeHero: null,
    filteredHeroes: [],
    ui: {
      filter: null
    }
  }
}

export class HeroStore extends EntityStore<HeroesState> {
  constructor () {
    super(createInitialState(), { name: 'heroes ' });
  }

  setActiveHero (hero: Hero): void {
    this.update((state) => ({ ...state, activeHero: hero }));
  }

  setSearchFilter (query: string): void {
    this.update((state) => ({ ...state, ui: { ...state.ui, filter: query } }))
  }

  setFilterResults(heroes: Hero[]): void {
    this.update((state) => ({ ...state, filteredHeroes: heroes }));
  }

  resetFilter(): void {
    this.update((state) => ({ ...state, filteredHeroes: [], ui: { ...state.ui, filter: null } }))
  }
}
