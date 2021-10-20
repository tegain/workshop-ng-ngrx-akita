import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { action, withTransaction } from '@datorama/akita';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';

import { Hero } from '../../hero';
import { HeroRepository } from './hero.repository';
import { MessageService } from '../message/message.service';
import { HeroStore } from '../../store/hero/hero.store';
import { MessageStore } from '../../store/message/message.store';


@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor (
    private heroRepository: HeroRepository,
    private heroesStore: HeroStore,
    private messagesStore: MessageStore,
  ) {
  }

  getHeroes (): void {
    this.heroRepository.getHeroes().pipe(
      first(),
      catchError(this.handleError<Hero[]>('getHeroes', [])),
    ).subscribe((heroes) => {
      this.heroesStore.set(heroes);
    })
  }

  /** GET hero by id. Will 404 if id not found */
  getHero (id: number): void {
    this.heroRepository.getHero(id).pipe(
      first(),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
      withTransaction((hero: Hero) => {
        if (hero) {
          this.log(`fetched hero id=${id}`)
          this.heroesStore.resetFilter();
          this.heroesStore.setError(null);
          this.heroesStore.setActiveHero(hero);
        }
      })).subscribe()
  }

  /* GET heroes whose name contains search term */
  searchHeroes (term: string): void {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return;
    }
    this.heroRepository.searchHeroes(term).pipe(
      first(),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    ).subscribe((heroes) => {
      this.heroesStore.setFilterResults(heroes);
    });

    // return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    //   tap(x => x.length ?
    //     this.log(`found heroes matching "${term}"`) :
    //     this.log(`no heroes matching "${term}"`)),
    //   catchError(this.handleError<Hero[]>('searchHeroes', []))
    // );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): void {
    this.heroRepository.addHero(hero).pipe(
      first(),
      catchError(this.handleError<Hero>('addHero')),
      withTransaction((newHero: Hero) => {
        this.log(`added hero w/ id=${newHero.id}`)
          this.heroesStore.setError(null);
          this.heroesStore.add(newHero);
      })).subscribe()
    // return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    //   tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    //   catchError(this.handleError<Hero>('addHero'))
    // );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (id: number): void {
    this.heroRepository.deleteHero(id).pipe(
      first(),
      catchError(this.handleError<Hero>('deleteHero')),
      withTransaction(() => {
        this.log(`deleted hero id=${id}`)
        this.heroesStore.setError(null);
        this.heroesStore.remove(id);
      })
      ).subscribe()
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): void {
    this.heroRepository.updateHero(hero).pipe(
      first(),
      catchError(this.handleError<Hero>('updateHero')),
      withTransaction(() => {
        this.log(`updated hero id=${hero.id}`)
        this.heroesStore.setError(null);
        this.heroesStore.setActiveHero(hero);
      })
    ).subscribe()
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.heroesStore.setError(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log (message: string) {
    this.messagesStore.addMessage(`HeroService: ${message}`);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
