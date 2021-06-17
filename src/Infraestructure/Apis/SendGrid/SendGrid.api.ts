import { Log } from '../../../Domain/Decorators/Log';
import { IApi } from '../../../Domain/Interfaces/IApi';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';

type SendGridStatsResponse = {
  date: string;
  stats: {
    metrics: { requests: number; processed: number; unique_opens: number };
  }[];
}[];

export class SendGridApi implements IEmailApi {
  private apiKey!: string;

  constructor(private api: IApi) {}
  @Log(process.env.LOG_LEVEL)
  public async getEmailStats(from: string, to: string): Promise<any> {
    const result: SendGridStatsResponse = await this.api.get('https://api.sendgrid.com/v3/stats', {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      params: {
        start_date: '2021-06-01',
        end_date: '2021-06-17',
      },
    });
    console.log(JSON.stringify(result, null, 2));
    throw new Error();
  }

  public setKey(key: string): this {
    this.apiKey = key;
    return this;
  }
}
