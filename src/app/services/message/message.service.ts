import { Injectable } from '@angular/core';
import { action } from '@datorama/akita';
import { MessageStore } from '../../store/message/message.store';

@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor (private readonly store: MessageStore) {
  }

  @action('Add message')
  add(message: string) {
    this.store.addMessage(message);
  }

  @action('Clear messages')
  clear() {
    this.store.clear();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
