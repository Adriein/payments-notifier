import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../application/CommandBus/CommandBus';
import { CheckForDefaultersCommand } from '../../domain/commands/CheckForDefaultersCommand';
import { IngestDefaultersCommand } from '../../domain/commands/IngestDefaultersCommand';
import { ExcelService } from '../Excel/ExcelService';

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
      const service = new ExcelService();

      const excel = service.read() as DefaultersExcelContent[];

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
      

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export { router as defaulters };
