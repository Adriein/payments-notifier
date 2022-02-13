import dayjs, { OpUnitType } from "dayjs";


export class Time {
  private static DAY_UNIT: OpUnitType = 'day';
  public static EUROPEAN_DATE_FORMAT = 'DD/MM/YYYY';
  public static STANDARD_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  public static AMERICAN_DATE_FORMAT = 'YYYY-MM-DD';
  public static AMERICAN_BEAUTIFIED_DATE_FORMAT = 'ddd-MMM-DD-YYYY';

  public static add(date: Date, days: number): Date {
    return dayjs(date).add(days, Time.DAY_UNIT).toDate();
  }

  public static subtract(date: Date, days: number): Date {
    return dayjs(date).subtract(days, Time.DAY_UNIT).toDate();
  }

  public static equal(date: Date, date1: Date): boolean {
    return dayjs(date).isSame(date1, Time.DAY_UNIT);
  }

  public static before(date: Date, date1: Date): boolean {
    return dayjs(date).isBefore(date1);
  }

  public static diff(date: Date, date1: Date): number {
    return dayjs(date).diff(date1, Time.DAY_UNIT);
  }

  public static format(date: Date, format: string): string {
    return dayjs(date).format(format)
  }

  public static now(): Date {
    return new Date();
  }
}