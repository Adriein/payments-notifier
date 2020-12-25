import low from 'lowdb';
import chalk from 'chalk';
import FileSync from 'lowdb/adapters/FileSync';

export default class Database {
  private static instance: Database;
  private db: low.LowdbSync<any>;

  private constructor() {
    console.log(chalk.yellow('> Creating lowdb...'));
    const adapter = new FileSync('db.json');
    this.db = low(adapter);

    const data = this.db.get('users').value();

    if (!data) {
      console.log(chalk.yellow('> Populating db...'));
      this.db.defaults({ users: [] }).write();
    }

    console.log(chalk.yellow('> Lowdb created ✨'));
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getConnection(): low.LowdbSync<any> {
    return this.db;
  }
}
