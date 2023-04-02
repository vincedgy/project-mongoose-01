require("dotenv").config();
import * as mongoDB from "mongodb";

async function main() {
  const uri: string = process.env.MONGODB_URL + "";
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

  try {
    await client.connect();
    console.log("Databases:")
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

async function listDatabases(client: mongoDB.MongoClient) {
  const databasesList = await client.db().admin().listDatabases();
  databasesList.databases.forEach((database) => {
    console.log(`- ${database.name}, ${database.sizeOnDisk}`);
  });
}
