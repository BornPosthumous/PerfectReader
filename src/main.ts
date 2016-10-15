import Database from './db'

declare function setTimeout(callback: () => void, timeout: number): void

async function Test() {
  console.log(Database.db)
}


Test()