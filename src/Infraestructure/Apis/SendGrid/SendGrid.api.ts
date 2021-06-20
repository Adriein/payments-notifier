import { Log } from '../../../Domain/Decorators/Log';
import { EmailStats } from '../../../Domain/Entities/Mail/EmailStats.entity';
import { IApi } from '../../../Domain/Interfaces/IApi';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';
import { debug } from '../../Helpers/Debug.utils';

type SendGridStatsResponse = {
  date: string;
  stats: {
    metrics: { requests: number; processed: number; unique_opens: number };
  }[];
}[];

type SendGridStats = {
  date: string;
  stats: {
    metrics: { requests: number; processed: number; unique_opens: number };
  }[];
};

export class SendGridApi implements IEmailApi {
  private apiKey!: string;
  private STATS_ENDPOINT: string = 'https://api.sendgrid.com/v3/stats';

  constructor(private api: IApi) {}

  @Log(process.env.LOG_LEVEL)
  public async getEmailStats(from: string, to: string): Promise<EmailStats[]> {
    debug(from, to);
    try {
      const results: SendGridStatsResponse = await this.api.get(
        this.STATS_ENDPOINT,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          params: {
            start_date: '2021-06-15',
            end_date: to,
          },
        }
      );
      return results.map(this.buildStats);
    } catch (error) {
      debug(error)
      throw new Error();
    }
  }

  public setKey(key: string): this {
    this.apiKey = key;
    return this;
  }

  private buildStats = (result: SendGridStats) =>
    new EmailStats(
      new Date(result.date),
      result.stats[0].metrics.processed,
      result.stats[0].metrics.unique_opens
    );
}
