import { EmailStats } from "../Entities/Mail/EmailStats.entity";

export interface IEmailApi {
  /**
   * Make a request to retrieve email stats.
   * @param {string} from - YYYY-MM-DD.
   * @param {string} to - YYYY-MM-DD.
   */
  getEmailStats(from: string, to: string): Promise<EmailStats[]>;

  setKey(key: string): this;
}
