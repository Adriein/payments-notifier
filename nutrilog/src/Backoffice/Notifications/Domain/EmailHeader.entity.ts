import { Email } from "../../../Shared/Domain/VO/Email.vo";


export class EmailHeader {
  constructor(
    private _subject: string,
    private _sender: Email,
    private _recipient: Email,
    private _templateId?: string
  ) {}

  public subject(): string {
    return this._subject;
  }

  public sender(): string {
    return this._sender.value;
  }

  public recipient(): string {
    return this._recipient.value;
  }

  public templateId(): string | undefined {
    return this._templateId;
  }
}