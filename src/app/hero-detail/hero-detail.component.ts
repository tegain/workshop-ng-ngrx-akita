import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../models/hero';
import {HeroesState} from '../store/heroes/heroes.reducer';
import {Store} from '@ngrx/store';
import {HeroesSelectors} from '../store/heroes/heroes.selectors';
import {filter, map} from 'rxjs/operators';
import {HeroesActions} from '../store/heroes/heroes.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroesState: Store<HeroesState>,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.heroesState.select(HeroesSelectors.heroByRouteParamSelector)
      .pipe(
        filter((hero: Hero | null | undefined) => !!hero),
        map((hero: Hero | null | undefined) => hero as Hero)
      ).subscribe((hero: Hero) => this.hero = {...hero});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroesState.dispatch(HeroesActions.putHero({hero: this.hero}));
      this.goBack();
    }
  }
}
