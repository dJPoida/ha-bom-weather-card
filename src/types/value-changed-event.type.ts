export interface ValueChangedEvent<T> extends CustomEvent {
  detail: {
    value: T;
  };
}
