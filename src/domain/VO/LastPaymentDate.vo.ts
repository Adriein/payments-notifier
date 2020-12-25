import { LastPaymentDateError } from '../Errors';
import dayjs from 'dayjs';

export class LastPaymentDate {
  private _date: Date;
  private regex = new RegExp(
    '([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})'
  );
  constructor(date: string) {
    const parsedDate = dayjs(date).format('YYYY-MM-DD')
    if (!this.regex.test(parsedDate)) {
      throw new LastPaymentDateError();
    }
    this._date = new Date(date);
  }

  public get date() {
    return this._date;
  }
}
