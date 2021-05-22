export class UpdateDietCommand {
    constructor(
      public userId: string,
      public adminId: string,
      public name: string,
      public objective: string,
      public mantinenceKcal: string
    ) {}
  }
  