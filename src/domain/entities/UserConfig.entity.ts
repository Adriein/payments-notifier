import { ISerializable } from '../interfaces/ISerializable';

export class UserConfig implements ISerializable {
  constructor(
    private lang: string,
    private role: string,
    private sendNotifications: boolean = true,
    private sendWarnings: boolean = false,
    private id?: string
  ) {}

  public getSendNotifications = (): boolean => {
    return this.sendNotifications;
  };

  public getSendWarnings = (): boolean => {
    return this.sendWarnings;
  };

  public getLang = (): string => {
    return this.lang;
  };

  public getRole = (): string => {
    return this.role;
  };

  public getId = (): string | undefined => {
    return this.id;
  };

  public serialize = (): Object => {
    return {
      sendNotifications: this.getSendNotifications() ? 'Si' : 'No',
      sendWarnings: this.getSendWarnings() ? 'Si' : 'No',
      language: this.getLang(),
      role: this.getRole(),
    };
  };
}
