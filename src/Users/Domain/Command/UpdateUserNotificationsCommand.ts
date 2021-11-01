export class UpdateUserNotificationsCommand {
  constructor(public id: string, public sendWarnings: string) {
  }
}