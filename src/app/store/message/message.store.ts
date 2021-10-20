import { arrayAdd, Store } from '@datorama/akita';

export interface MessagesState {
  messages: string[];
}

function createInitialState(): MessagesState {
  return {
    messages: []
  }
}

export class MessageStore extends Store<MessagesState> {
  constructor () {
    super(createInitialState(), { name: 'messages' });
  }

  addMessage(message: string): void {
    this.update(({ messages }: MessagesState) => ({ messages: arrayAdd(messages, message) }))
  }

  clear(): void {
    this.update((state: MessagesState) => ({ ...state, messages: [] }))
  }
}
