import { User } from "../../User/Domain/Entity/User.entity";
import { AppConfig } from "../../AppConfig/Domain/AppConfig.entity";

export abstract class Template {
  protected abstract user: User;
  protected abstract config: AppConfig;

  public abstract generate(): Promise<string>;

  private async getEmailContent(): Promise<string> {
    return this.config.emailContent();
  }

  private assignAlias(substr: string): string {
    const start = substr.indexOf(':') + 1;
    const end = substr.indexOf('}') - start;

    return substr.substr(start, end);
  }

  private getAliasTemplate(substr: string): string {
    const start = substr.indexOf('{');
    const end = substr.indexOf('}') + 2;

    return substr.substr(start, end);
  }

  protected async hasCustomEmail(): Promise<boolean> {
    const hasContent = await this.getEmailContent();

    return hasContent !== '';
  }

  protected getUserPricing(): string {
    return '';
  }

  protected async parseEmailContent(): Promise<string> {
    const email = await this.getEmailContent();

    if (email.includes('alias')) {
      const substring = email.substr(email.search('{{alias'));

      const aliasTemplate = this.getAliasTemplate(substring);
      const alias = this.assignAlias(substring);

      return email
        .replace('{{usuario}}', this.user.name())
        .replace('{{tarifa}}', this.getUserPricing())
        .replace('{{preaviso}}', this.config.warningDelay().toString())
        .replace(aliasTemplate, alias);
    }

    return email
      .replace('{{usuario}}', this.user.name())
      .replace('{{preaviso}}', this.config.warningDelay().toString())
      .replace('{{tarifa}}', this.getUserPricing());
  }
}
