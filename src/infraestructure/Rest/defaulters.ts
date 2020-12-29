import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../application/CommandBus/CommandBus';
import { CheckForDefaultersCommand } from '../../domain/commands/CheckForDefaultersCommand';
import { EnsureUsersConsistencyCommand } from '../../domain/commands/EnsureUsersConsistencyCommand';
import { GenerateReportCommand } from '../../domain/commands/GenerateReportCommand';
import { IngestDefaultersCommand } from '../../domain/commands/IngestDefaultersCommand';
import { FileError } from '../../domain/errors/FileError';
import { ExcelService } from '../Excel/ExcelService';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { FILES_PATH } from '../../constants';

export type DefaultersExcelContent = {
  nombre: string;
  tipo_de_cuota: string;
  email: string;
  fecha_de_pago: string;
};

const router: Router = express.Router();

const commandBus = new CommandBus();

router.post(
  '/upload',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) {
        new FileError('No file uploaded');
      }

      const file = req.files!.defaulters as fileUpload.UploadedFile;

      file.mv(`${FILES_PATH}/defaulters.xlsx`);

      const service = new ExcelService();

      const excel = service.read() as DefaultersExcelContent[];

      await commandBus.execute(new EnsureUsersConsistencyCommand(excel));
      console.log(excel.length)
      for (const row of excel) {     
        await commandBus.execute(
          new IngestDefaultersCommand(
            row.nombre,
            row.email,
            row.tipo_de_cuota,
            row.fecha_de_pago
          )
        );
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/defaulters',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(new CheckForDefaultersCommand());

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/report',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(new GenerateReportCommand());

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/health',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send('Alive');
    } catch (error) {
      next(error);
    }
  }
);

export { router as defaulters };

const deleteOldExcels = (): void => {
  if (fs.existsSync(`${process.cwd()}/src/upload/defaulters.xlsx`)) {
    fs.rmSync(`${process.cwd()}/src/upload/defaulters.xlsx`);
  }
};
