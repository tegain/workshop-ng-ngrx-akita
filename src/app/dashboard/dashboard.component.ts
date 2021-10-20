import { Component, OnInit } from '@angular/core';
import { take } from 'ramda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../services/hero/hero.service';
import { HeroQuery } from '../store/hero/hero.query';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;

  constructor (
    private readonly heroService: HeroService,
    private readonly heroesQuery: HeroQuery
  ) {
  }

  ngOnInit () {
    this.heroes$ = this.heroesQuery.heroes$.pipe(
      map<Hero[], Hero[]>(take(5))
    )
    this.getHeroes();
  }

  getHeroes (): void {
    this.heroService.getHeroes()
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
