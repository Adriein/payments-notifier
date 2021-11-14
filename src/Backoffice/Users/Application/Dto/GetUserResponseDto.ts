import { User } from "../Domain/User.entity";

export class GetUserResponseDto {
  public constructor(
    public readonly user: User,
  ) {
  }
}