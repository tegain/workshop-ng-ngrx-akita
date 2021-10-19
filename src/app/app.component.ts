import {Component, OnInit} from '@angular/core';
import {HeroesActions} from './store/heroes/heroes.actions';
import {Store} from '@ngrx/store';
import {HeroesState} from './store/heroes/heroes.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(private heroesState: Store<HeroesState>) {
  }

  ngOnInit() {
    this.heroesState.dispatch(HeroesActions.getHeroes());
  }
}
