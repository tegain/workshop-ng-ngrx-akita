import { createAction, props } from '@ngrx/store';
import {Message} from '../../models/message';

const setNewMessage = createAction('[Shared] add new message to list', props<{ message: Message }>());
const clearMessages = createAction('[Shared] clear message list');

export const SharedActions = {
  setNewMessage,
  clearMessages
};
