export interface INotifier {
  notify(destination: string, payload: string): Promise<void>;
}
