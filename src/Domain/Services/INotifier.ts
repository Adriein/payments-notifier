export interface INotifier {
  notify(destination: string, payload: string, options?: Object): Promise<void>;
}
