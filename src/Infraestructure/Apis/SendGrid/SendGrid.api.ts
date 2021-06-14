import { Log } from '../../../Domain/Decorators/Log';
import { IApi } from '../../../Domain/Interfaces/IApi';
import { IEmailApi } from '../../../Domain/Interfaces/IEmailApi';

type SendGridDesignsResponse = { result: { id: string; name: string }[] };

export class SendGridApi implements IEmailApi {
  constructor(private api: IApi) {}
  @Log(process.env.LOG_LEVEL)
  public async getDynamicTemplateId(name: string): Promise<any> {
    const { result: results }: SendGridDesignsResponse = await this.api.get(
      'https://api.sendgrid.com/v3/designs',
      {
        headers: {
          Authorization: `Bearer ${process.env.SEND_GRID_API_KEY!}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = results.find((template) => template.name === name);
   
    if (!result) {
      throw new Error();
    }
    return result.id;
  }
}
