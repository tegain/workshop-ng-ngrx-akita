import {Component, OnInit} from '@angular/core';

import {Hero} from '../models/hero';
import {HeroesState} from '../store/heroes/heroes.reducer';
import {Store} from '@ngrx/store';
import {HeroesActions} from '../store/heroes/heroes.actions';
import {Observable} from 'rxjs';
import {HeroesSelectors} from '../store/heroes/heroes.selectors';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;

  constructor(private heroesState: Store<HeroesState>) {
  }

  ngOnInit() {
    this.heroes$ = this.heroesState.select(HeroesSelectors.heroes);
  }

  add(name: string): void {
    this.heroesState.dispatch(HeroesActions.addHero({heroName: name}));
  }

  delete(hero: Hero): void {
    this.heroesState.dispatch(HeroesActions.deleteHero({id: hero.id}));
  }
}
