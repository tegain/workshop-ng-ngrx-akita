import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {Hero} from '../models/hero';
import {Store} from '@ngrx/store';
import {HeroesState} from '../store/heroes/heroes.reducer';
import {HeroesActions} from '../store/heroes/heroes.actions';
import {HeroesSelectors} from '../store/heroes/heroes.selectors';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroesState: Store<HeroesState>) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroesState.dispatch(HeroesActions.searchHeroes({query: null}));
    this.heroes$ = this.heroesState.select(HeroesSelectors.heroesFiltered);
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged()
    ).subscribe(
      (term: string) => this.heroesState.dispatch(HeroesActions.searchHeroes({query: term}))
    );
  }
}
