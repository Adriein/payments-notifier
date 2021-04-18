import { ITimeUtils } from '../../Domain/Helpers/ITime.utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

export class Time implements ITimeUtils {
  public equal(date1: Date, date2: Date): boolean {
    return dayjs(date1).isSame(dayjs(date2));
  }

  public static diff(
    from: Date,
    to: Date,
    unitOfTime: dayjs.QUnitType | dayjs.OpUnitType = 'month'
  ): number {
    const date1 = dayjs(from);
    const date2 = dayjs(to);

    return date2.diff(date1, unitOfTime);
  }

  public static month(date: Date) {
    return dayjs(date).format('MMMM');
  }

  public static between(reference: Date, from: Date, to: Date): boolean {
    dayjs.extend(isBetween);
    const date1 = dayjs(from);
    const date2 = dayjs(to);
    return dayjs(reference).isBetween(date1, date2, null, '[]');
  }
}
