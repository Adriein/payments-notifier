import { ActivityType } from '../constants';
import { ActivityError } from '../Errors/ActivityError';
import { ValueObject } from '../../Shared/Domain/VO/ValueObject';

export class Activity extends ValueObject {
  private activity: string;
  constructor(activity: string) {
    super();

    if (this.validate(activity)) {
      throw new ActivityError();
    }

    this.activity = activity;
  }

  public get value(): string {
    return this.activity;
  }

  protected validate(activity: string): boolean {
    return (
      typeof activity !== 'string' ||
      (activity !== ActivityType.low &&
        activity !== ActivityType.moderate &&
        activity !== ActivityType.high)
    );
  }
}
