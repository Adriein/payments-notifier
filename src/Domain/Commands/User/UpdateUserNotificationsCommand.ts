export class UpdateUserNotificationsCommand {
  constructor(public email: string, public sendWarnings: string) {}
}
