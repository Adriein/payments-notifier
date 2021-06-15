import { IEmailConfig } from "../../Interfaces/IEmailConfig";

export class EmailConfig implements IEmailConfig {
  constructor(
    public from: string,
    public to: string,
    public subject: string,
    public text: string,
    public html: string
  ) {}
}
