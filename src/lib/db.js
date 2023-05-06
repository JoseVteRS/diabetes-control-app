import Database from "better-sqlite3";

const createTable = "CREATE TABLE IF NOT EXISTS users('name' varchar, 'email' varchar, 'id' varchar PRIMARY KEY, 'password' varchar );"




export function openDB() {
  const db = new Database("/tmp/data.db");

  db.exec(createTable);

  return db;
}
