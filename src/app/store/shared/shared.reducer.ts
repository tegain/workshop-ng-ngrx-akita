import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {SharedActions} from './shared.actions';
import {Message} from '../../models/message';

export const SharedFeatureKey = 'shared';
export type MessageStateType = EntityState<Message>;

export const messageAdapter = createEntityAdapter<Message>();

export interface SharedState {
  messages: MessageStateType;
}

const initialState: SharedState = {
  messages: messageAdapter.getInitialState({})
};

export const sharedReducers = createReducer(
  initialState,
  on(SharedActions.setNewMessage, (state, {message}) => ({
    ...state,
    messages: {...messageAdapter.addOne({id: state.messages.ids.length, ...message}, state.messages)}
  })),
  on(SharedActions.clearMessages, (state) => ({
    ...state,
    messages: {...messageAdapter.removeAll(state.messages)}
  }))
);
