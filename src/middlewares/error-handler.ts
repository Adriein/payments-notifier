import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../Domain/Errors';
import chalk from 'chalk';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(chalk.red.bold(`> Controlled Application Error: ${err.message}`));
    return res
      .status(err.statusCode)
      .send({ errors: err.serialize() });
  }

  console.log(chalk.red.bold(`> Unexpected Application ${err.stack}`));
  res.status(400).send({
    errors: [ { message: 'Something went wrong' } ],
  });
};
