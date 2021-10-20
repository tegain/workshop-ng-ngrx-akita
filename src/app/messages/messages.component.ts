import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message/message.service';
import { MessageQuery } from '../store/message/message.query';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<string[]> | undefined;

  constructor(
    public readonly messagesService: MessageService,
    public readonly messagesQuery: MessageQuery,
  ) {}

  ngOnInit() {
    this.messages$ = this.messagesQuery.messages$;
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
