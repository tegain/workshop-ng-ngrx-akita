import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../services/hero/hero.service';
import { HeroQuery } from '../store/hero/hero.query';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;

  constructor(private heroService: HeroService, private heroesQuery: HeroQuery) { }

  ngOnInit() {
    this.heroes$ = this.heroesQuery.heroes$;
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
