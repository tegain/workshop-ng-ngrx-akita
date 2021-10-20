import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { MessagesState, MessageStore } from './message.store';

@Injectable({ providedIn: 'root' })
export class MessageQuery extends Query<MessagesState> {
  constructor (public readonly store: MessageStore) {
    super(store);
  }

  messages$: Observable<string[]> = this.select((state) => state.messages);
}
