import {Component, OnInit} from '@angular/core';
import {Hero} from '../models/hero';
import {Store} from '@ngrx/store';
import {HeroesState} from '../store/heroes/heroes.reducer';
import {Observable} from 'rxjs';
import {HeroesSelectors} from '../store/heroes/heroes.selectors';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;

  constructor(private heroesState: Store<HeroesState>) {
  }

  ngOnInit() {
    this.heroes$ = this.heroesState.select(HeroesSelectors.heroes)
      .pipe(map(heroes => heroes.slice(1, 5)));
  }
}
