import { createFeatureSelector, createSelector } from '@ngrx/store';
import {messageAdapter, SharedFeatureKey, SharedState} from './shared.reducer';

const sharedState = createFeatureSelector(SharedFeatureKey);
const messageSelectors = messageAdapter.getSelectors();

// @ts-ignore
const messageState = createSelector(sharedState, (state: SharedState) => state.messages);
const messages = createSelector(messageState, messageSelectors.selectAll);

export const SharedSelectors = {
  messages
};
