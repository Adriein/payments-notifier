export class UpdateUserNotificationsCommand {
  constructor(public email: string, public sendNotifications: string) {}
}
