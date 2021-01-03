import pg from 'pg';
import chalk from 'chalk';

export default class Database {
  private static instance: Database;
  private pool?: pg.Pool;

  private constructor() {
    console.log(chalk.yellow('> Establishing db connection... 💫'));

    (async () => {
      try {
        this.pool = new pg.Pool({
          host: process.env.DATABASE_HOST!,
          port: parseInt(process.env.DATABASE_PORT!),
          database: process.env.DATABASE_NAME!,
          user: process.env.DATABASE_USER!,
          password: process.env.DATABASE_PASSWORD!,
        });

        await this.pool.query('SELECT 1 + 1;');
      } catch (error) {
        throw new Error();
      }
    })();

    console.log(
      chalk.yellow(`> Connected to ${process.env.DATABASE_NAME!} DB ✨`)
    );
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getConnection(): pg.Pool {
    return this.pool!;
  }
}
