require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import cookieSession from 'cookie-session';
import chalk from 'chalk';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import { errorHandler } from './middlewares';
import Database from './Infraestructure/Data/Database';
import { FILES_PATH } from './Domain/constants';
import { AppRouter } from './Infraestructure/Rest/AppRouter';
import './Infraestructure/Rest/Controllers/Auth/SignInController';
import './Infraestructure/Rest/Controllers/Auth/RegisterController';
import './Infraestructure/Rest/Controllers/Auth/SignOutController';
import './Infraestructure/Rest/Controllers/Users/CalculateReportController';
import './Infraestructure/Rest/Controllers/Users/CreateUserController';
import './Infraestructure/Rest/Controllers/Users/DeleteUserController';
import './Infraestructure/Rest/Controllers/Users/RegisterUserPaymentController';
import './Infraestructure/Rest/Controllers/Users/UpdateUserController';
import './Infraestructure/Rest/Controllers/Users/UpdateUserNotificationController';
import './Infraestructure/Rest/Controllers/Users/UpdateUserPasswordController';
import './Infraestructure/Rest/Controllers/Defaulters/CheckForDefaultersController';
import './Infraestructure/Rest/Controllers/Defaulters/GenerateDefaultersReportController';
import './Infraestructure/Rest/Controllers/Config/CreatePricingController';
import './Infraestructure/Rest/Controllers/Config/ModifyAppConfigController';
import './Infraestructure/Rest/Controllers/Config/GetConfigController';
import './Infraestructure/Rest/Controllers/Charts/GetMoneyChartController';
import './Infraestructure/Rest/Controllers/Charts/GetUserChartController';
import './Infraestructure/Rest/Controllers/Backoffice/ContactEmailController';
import './Nutrition/Infrastructure/Controller/GetDietsController';
import './Nutrition/Infrastructure/Controller/CreateNutritionController';
import './Diet/Infrastructure/Controller/CreateDietController';
import './Nutrition/Infrastructure/Controller/ModifyDietController';


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

    this.initDirectories();

    const app = express();

    app.set('port', process.env.PORT || 5000);
    console.log(
      chalk.cyan(
        `> App Environment: PORT: ${app.get('port')} CONFIG: ${
          process.env.NODE_ENV
        } `
      )
    );

    app.use(express.json());
    app.use(
      cookieSession({
        signed: false,
        secure: false,
        // maxAge: 900000,
        httpOnly: false,
      })
    );
    app.use(fileUpload());
    app.use('/api/v1', AppRouter.getInstance());
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

  private checkEnvVariables(): void {
    if (
      !process.env.SEND_GRID_API_KEY ||
      !process.env.NODE_ENV ||
      !process.env.ADMIN_EMAIL ||
      !process.env.JWT_KEY ||
      !process.env.LOG_LEVEL ||
      !process.env.DAYS_BEFORE_EXPIRATION ||
      !process.env.DATABASE_NAME ||
      !process.env.DATABASE_USER ||
      !process.env.DATABASE_PASSWORD ||
      !process.env.DATABASE_PORT ||
      !process.env.DATABASE_HOST
    ) {
      process.exit(1);
    }
  }

  private initDirectories(): void {
    if (fs.existsSync(FILES_PATH)) {
      return;
    }

    fs.mkdirSync(FILES_PATH);

    console.log(chalk.yellow('> File folders created 📁'));
  }
}
