import { readdirSync, existsSync } from 'fs';
import XSLX from 'xlsx';
import { FILES_PATH } from '../../Domain/constants';
import { ExcelError } from '../../Domain/errors/ExcelError';
import { IExcelService } from '../../Domain/Services/IExcelService';

export class ExcelService implements IExcelService {
  private path = FILES_PATH;

  private exists(): string {
    const files = readdirSync(this.path, { withFileTypes: true });
    if (files.length !== 1) {
      throw new ExcelError(
        'The excel file not exists or there are more than 1 excel files'
      );
    }

    this.hasCorrectExtension(files[0]);

    return `${this.path}/${files[0].name}`;
  }

  private hasCorrectExtension(file: any): void {
    const extension = file.name.split('.');
    if (extension[1] !== 'xlsx') {
      throw new ExcelError(`File ${file.name} is not xlsx extension`);
    }
  }

  public read(): object[] {
    const file = this.exists();
    const excel = XSLX.readFile(file, { cellDates: true });

    const worksheet = excel.SheetNames[0];

    return XSLX.utils.sheet_to_json(excel.Sheets[worksheet]);
  }
}
