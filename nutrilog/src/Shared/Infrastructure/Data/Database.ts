import pg from 'pg';
import chalk from 'chalk';
import { PrismaClient } from "@prisma/client";

export default class Database {
  private static _instance: Database;
  //private pool?: pg.Pool;
  private readonly prismaClient: PrismaClient;

  private constructor() {
    console.log(chalk.yellow('> Establishing db connection... 💫'));
    try {
      // const ssl = process.env.NODE_ENV === 'PRO' ? { ssl: { rejectUnauthorized: false } } : {};
      /*this.pool = new pg.Pool({
       host: process.env.DATABASE_HOST!,
       port: parseInt(process.env.DATABASE_PORT!),
       database: process.env.DATABASE_NAME!,
       user: process.env.DATABASE_USER!,
       password: process.env.DATABASE_PASSWORD!,
       ...ssl
       });*/

      // await this.pool.query('SELECT 1 + 1;');
      this.prismaClient = new PrismaClient();
    } catch (error) {
      console.log(
        chalk.red(`> Error connecting to ${process.env.DATABASE_NAME!} DB 😶`)
      );
      throw new Error();
    }

    console.log(
      chalk.yellow(`> Connected to ${process.env.DATABASE_NAME!} DB ✨`)
    );
  }

  public static instance(): Database {
    if (!Database._instance) {
      Database._instance = new Database();
    }

    return Database._instance;
  }

  /*public getConnection(): pg.Pool {
   return this.pool!;
   }*/

  public connection(): PrismaClient {
    return this.prismaClient!;
  }
}
