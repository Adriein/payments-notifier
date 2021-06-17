export interface IEmailApi {
  /**
   * Make a request to retrive email stats.
   * @param {string} from - YYYY-MM-DD.
   * @param {string} to - YYYY-MM-DD.
   */
  getEmailStats(from: string, to: string): Promise<any[]>;

  setKey(key: string): this;
}
