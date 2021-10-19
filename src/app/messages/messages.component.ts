import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {SharedActions, SharedSelectors, SharedState} from '../store/shared';
import {Store} from '@ngrx/store';
import {Message} from '../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<Message[]> | undefined;

  constructor(public sharedStore: Store<SharedState>) {}

  ngOnInit() {
    this.messages$ = this.sharedStore.select(SharedSelectors.messages);
  }

  clear() {
    this.sharedStore.dispatch(SharedActions.clearMessages());
  }
}
