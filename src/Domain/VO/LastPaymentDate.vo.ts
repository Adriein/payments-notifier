import { Time } from '../../Infraestructure/Helpers/Time.utils';
import { LastPaymentDateError } from '../Errors';
import { ValueObject } from './ValueObject';

export class LastPaymentDate extends ValueObject{
  private _date: Date;
  private regex = new RegExp(
    '([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})'
  );
  constructor(date: string) {
    super();
    let formatedDate = date;
    if (date.includes('/')) {
      formatedDate = this.formatStringDate(date);
    }
    
    const parsedDate = Time.format(formatedDate, Time.AMERICAN_DATE_FORMAT);

    if (this.validate(parsedDate)) {
      throw new LastPaymentDateError();
    }
    this._date = new Date(formatedDate);
  }

  public get value(): Date {
    return this._date;
  }

  private formatStringDate = (date: string): string => {
    const [day, month, year]: string[] = date.split('/');
    return `${month}-${day}-${year}`;
  };

  protected validate(parsedDate: string): boolean {
    return !this.regex.test(parsedDate)
  }
}
