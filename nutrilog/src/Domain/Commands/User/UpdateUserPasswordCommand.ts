export class UpdateUserPasswordCommand {
  constructor(public userId: string, public oldPassword: string, public newPassword: string) {}
}
