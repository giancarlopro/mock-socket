// Type definitions for Mock Socket 8.X+
// Project: Mock Socket
// Definitions by: Travis Hoover <https://github.com/thoov/mock-socket>

/// <reference lib="dom" />
declare module 'mock-socket' {
  class EventTarget {
    listeners: any;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  }

  interface WebSocketCallbackMap {
    close: () => void;
    error: (err: Error) => void;
    message: (message: string | Blob | ArrayBuffer | ArrayBufferView) => void;
    open: () => void;
  }

  //
  // https://html.spec.whatwg.org/multipage/web-sockets.html#websocket
  //
  class WebSocket extends EventTarget {
    constructor(url?: string, protocols?: string|string[]);

    static readonly CONNECTING: 0;
    static readonly OPEN: 1;
    static readonly CLOSING: 2;
    static readonly CLOSED: 3;

    readonly url: string;

    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
    readonly readyState: number;
    readonly bufferedAmount: number;

    onopen: EventHandlerNonNull;
    onerror: EventHandlerNonNull;
    onclose: EventHandlerNonNull;
    readonly extensions: string;
    readonly protocol: string;
    close(code?: number, reason?: string): void;

    onmessage: EventHandlerNonNull;
    binaryType: BinaryType;
    send(data: string | Blob | ArrayBuffer | ArrayBufferView): void;
    on<K extends keyof WebSocketCallbackMap>(type: K, callback: WebSocketCallbackMap[K]): void;
  }

  class Server extends EventTarget {
    constructor(url: string, options?: ServerOptions);

    readonly options?: ServerOptions;

    start(): void;
    stop(callback?: () => void): void;

    on(type: string, callback: (socket: WebSocket) => void): void;
    close(options?: CloseOptions): void;
    emit(event: string, data: any, options?: EmitOptions): void;

    clients(): WebSocket[];
    to(room: any, broadcaster: any, broadcastList?: object): ToReturnObject;
    in(any: any): ToReturnObject;
    simulate(event: string): void;

    public of(url: string): Server;
  }

  interface CloseOptions {
    code: number;
    reason: string;
    wasClean: boolean;
  }

  interface EmitOptions {
    websockets: WebSocket[];
  }

  interface ToReturnObject {
    to: (chainedRoom: any, chainedBroadcaster: any) => ToReturnObject;
    emit(event: Event, data: any): void;
  }

  interface ServerOptions {
    verifyClient?: () => boolean;
    selectProtocol?: (protocols: string[]) => string | null;
  }

  class SocketIO extends EventTarget {
    constructor(url?: string, protocol?: string);

    static readonly CONNECTING: 0;
    static readonly OPEN: 1;
    static readonly CLOSING: 2;
    static readonly CLOSED: 3;

    broadcast: BroadcastReturnObject;

    close(): SocketIO | undefined;
    disconnect(): SocketIO | undefined;
    emit(event: string, ...data: object[]): SocketIO;
    send(data: string | Blob | ArrayBuffer | ArrayBufferView): SocketIO;
    on(type: string, callback: () => void): SocketIO;
    off(type: string): void;
    join(room: string): void;
    leave(room: string): void;
    to(room: string): SocketIO;
    in(): void;
    dispatchEvent(event: Event, ...customArgument: object[]): boolean | undefined;
  }

  interface BroadcastReturnObject {
    emit(event: string, data: object): SocketIO;
    to(room: string): SocketIO;
    in(room: string): SocketIO;
  }

  interface Event {
    type: string,
  }
}
