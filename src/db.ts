import pgPromise from 'pg-promise'
import * as bluebird from 'bluebird'

interface IDatabaseConfig {
  host: string,
  port: number,
  database: string,
  user: string,
  password?: string
}

export default class Database {
    private static config: IDatabaseConfig = {
        host: 'localhost',
        port: 5432,
        database: 'PerfectReader',
        user: 'postgres',
        password: 'postgres'
    }

    private static options: Object = {
      promiseLib: bluebird
    }

    private static pgp = pgPromise(Database.options)
    private static _db = Database.pgp(Database.config)
    public static get db(): any {
      return Database._db
    } 
}