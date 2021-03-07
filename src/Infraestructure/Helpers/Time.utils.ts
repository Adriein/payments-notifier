import { ITimeUtils } from '../../Domain/Helpers/ITime.utils';
import dayjs from 'dayjs';

export class TimeUtils implements ITimeUtils {
  public equal(date1: Date, date2: Date): boolean {
    return dayjs(date1).isSame(dayjs(date2));
  }
}
