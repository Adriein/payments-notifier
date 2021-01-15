import { ActivityType } from '../constants';
import { ActivityError } from '../Errors/ActivityError';

export class Activity {
  constructor(public activity: string) {
    if (
      typeof activity !== 'string' ||
      (activity !== ActivityType.low &&
        activity !== ActivityType.moderate &&
        activity !== ActivityType.high)
    ) {
      throw new ActivityError();
    }
  }
}
