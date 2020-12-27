require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import { errorHandler } from './middlewares';
import { defaulters } from './infraestructure/Rest/defaulters';
import Database from './infraestructure/Data/Database';
import path from 'path';

export default class App {
  public init() {
    console.log(chalk.cyan('> Starting up... 🚀'));

    console.log(chalk.cyan('> Checking env variables...'));

    process.on('exit', (code) => {
      console.log(
        chalk.red.bold(
          `> About to exit with code: ${code} some env variables are not setted`
        )
      );
    });

    this.checkEnvVariables();

    console.log(chalk.cyan('> Env variables setted correctly ✨'));

    Database.getInstance();

    const app = express();

    app.set('port', process.env.PORT || 5000);
    console.log(
      chalk.cyan(
        `> App Environment: PORT: ${app.get('port')} CONFIG: ${
          process.env.NODE_ENV
        } `
      )
    );

    app.use(bodyParser.json());
    app.use('/api/v1', defaulters);
    app.use(errorHandler);

    if (process.env.NODE_ENV === 'PRO') {
      app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
          res.redirect(`https://${req.header('host')}${req.url}`);
        else next();
      });

      app.use(express.static('client/build'));

      app.get('*', (req, res) => {
        res.sendFile(
          path.resolve(__dirname, '..', 'client', 'build', 'index.html')
        );
      });
    }

    app.listen(app.get('port'), () => {
      console.log(chalk.green.bold(`> Server running... ✅`));
    });
  }

  private checkEnvVariables() {
    if (
      !process.env.SEND_GRID_API_KEY ||
      !process.env.NODE_ENV ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_NAME
    ) {
      process.exit(1);
    }
  }
}
