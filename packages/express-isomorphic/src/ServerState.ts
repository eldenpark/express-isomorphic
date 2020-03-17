import { logger } from 'jege/server';
import { Server } from 'socket.io';

const log = logger('[express-isomorphic]');
const IO = Symbol('io');

class ServerState<State> {
  error?: Error;
  eventHandlers: EventHandlers;
  [IO]: Server;
  state: State;
  socketPath?: string;
  socketPort?: number;

  constructor(state: State) {
    this.state = state;
    this.eventHandlers = {
      change: [],
    };
  }

  get io() {
    return this[IO] as Server;
  }

  set io(io: Server) {
    this[IO] = io;
  }

  on(messageType: MessageType, handler: Function) {
    if (this.eventHandlers[messageType]) {
      this.eventHandlers[messageType].push(handler);
    } else {
      this.eventHandlers[messageType] = [handler];
    }
  }

  update(updater: Updater<State>) {
    const nextState = {
      ...this.state,
      ...updater(this.state),
    };
    this.state = nextState;

    log('update(): state is updated into: %j', this);
    return this;
  }
}

export default ServerState;

interface Error {
  errorObj: any;
  type: string;
}

interface EventHandlers {
  change: Function[];
}

type MessageType = 'change';

type Updater<T> = (serverState: T) => Partial<T>;
