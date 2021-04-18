import { ActivityType } from '../constants';
import { ActivityError } from '../Errors/ActivityError';

export class Activity {
  private activity: string;
  constructor(activity: string) {
    if (
      typeof activity !== 'string' ||
      (activity !== ActivityType.low &&
        activity !== ActivityType.moderate &&
        activity !== ActivityType.high)
    ) {
      throw new ActivityError();
    }

    this.activity = activity;
  }

  public get value(): string {
    return this.activity;
  }
}
