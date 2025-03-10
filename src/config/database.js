const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let db;

async function connectToDb() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`Connected to MongoDB: ${dbName}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Connect to db first");
  }
  return db;
}

module.exports = { connectToDb, getDB };
