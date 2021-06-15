import { IEmailConfig } from '../Interfaces/IEmailConfig';

export interface INotifier {
  notify(config: IEmailConfig): Promise<void>;
}
