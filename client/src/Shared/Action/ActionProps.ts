export interface ActionProps<T = unknown> {
  type: string;
  payload?: T
}