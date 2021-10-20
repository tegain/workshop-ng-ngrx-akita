import { Component, OnInit } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../services/hero/hero.service';
import { HeroQuery } from '../store/hero/hero.query';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  private readonly sub = new Subscription()

  constructor (
    private readonly heroService: HeroService,
    private readonly heroQuery: HeroQuery
  ) {
  }

  // Push a search term into the observable stream.
  search (term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit (): void {
    this.heroes$ = this.heroQuery.filteredHeroes$;
    this.sub.add(this.searchHeroes());
  }

  private searchHeroes () {
    return this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      map((term: string) => this.heroService.searchHeroes(term)),
    ).subscribe();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
