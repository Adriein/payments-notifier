import { IEmailConfig } from '../../Interfaces/IEmailConfig';
import { EmailConfig } from './EmailConfig.entity';

export class TemplateEmailConfig extends EmailConfig implements IEmailConfig {
  constructor(
    public from: string,
    public to: string,
    public templateId: string,
    public dynamicTemplateData: Object
  ) {
    super(from, to, '', '', '');
  }
}
