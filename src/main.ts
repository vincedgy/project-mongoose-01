require("dotenv").config();
import * as mongoDB from "mongodb";
import User from "./models/User";
import Address from "./models/Address";

async function main() {
  const uri: string = process.env.MONGODB_URL + "";
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);
  const users: mongoDB.Collection = client.db().collection("users");
  // Create a Unique Index for email
  users.createIndex({ email: 1 }, { unique: true });

  try {
    await client.connect();
    await listDatabases(client);

    // Create a new User
    const address1: Address = new Address(
      "13",
      "91370",
      "Verrieres-Le-Buisson",
      "Rue de Perthuis",
      "France"
    );
    const user1: User = new User(
      "Willow",
      "Dagoury",
      "willow.dagoury@gmail.com",
      10,
      ["eat", "sleep"],
      address1
    );
    await createUser(users, user1);

    const user2: User = new User(
      "Jeanne",
      "Dagoury",
      "jeanne.dagoury@gmail.com",
      10,
      ["climb", "sleep"],
      address1
    );
    await createUser(users, user2);

    //await createMultipleUsers(users, [user1, user2])
    // Looking for OneUser
    const cUser1 = await finUserByEmail(users, user1.email);
    console.log(cUser1);




  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/**
 * finUserByEmail
 * @param users 
 * @param passedEmail 
 * @returns 
 */
async function finUserByEmail(users: mongoDB.Collection, passedEmail: string) {
  console.log(`Looking for user with email ${passedEmail}`);
  const findUser = await users.findOne({ email: passedEmail });
  if (findUser?._id) {
    console.log(`User with id ${findUser?._id} has been found`);
  }
  return findUser;
}

/**
 * createUser
 * @param users 
 * @param newUser 
 */
async function createUser(users: mongoDB.Collection, newUser: User) {
  const userExist = await users.findOne({ email: newUser.email });
  if (!userExist) {
    const result = await users.insertOne(newUser);
    console.log(`New user created with id: ${result.insertedId}`);
  } else {
    console.error(`User already exist with id : ${userExist._id}`);
  }
}

/**
 * createMultipleUsers
 * @param users 
 * @param listOfUsers 
 */
async function createMultipleUsers(
  users: mongoDB.Collection,
  listOfUsers: Array<User>
) {
  console.log("Creating multiple users");
  const result = await users.insertMany(listOfUsers);
  console.log(`Number of records inserted is : ${result.insertedCount}`);
}

/**
 * listDatabases
 * @param client 
 */
async function listDatabases(client: mongoDB.MongoClient) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((database) => {
    console.log(`- ${database.name}, ${database.sizeOnDisk}`);
  });
}
