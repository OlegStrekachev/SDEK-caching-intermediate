import { fetchData } from "../sdek_authorized_fetch/fetch_data_from_SDEK.js";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

// Define function to write data to MongoDB

export async function writeToMongoDB() {
  const { cities_data, deliverypoints_data } = await fetchData(); // call the fetchData() function to retrieve the data

  const client = new MongoClient(process.env.MONGODB_URL); // create a new MongoClient

  try {
    // Use connect method to connect to the Server

    await client.connect();
    console.log("Connected correctly to server");

    // Define the database and collection

    const db = client.db(process.env.MONGODB_DBNAME);
    
    const cities_collection = db.collection(
      process.env.MONGODB_COLLECTION_CITIES
    );
    const deliverypoints_collection = db.collection(
      process.env.MONGODB_COLLECTION_DELIVERYPOINTS
    );

    // Replace all documents in the cities_collection with the new data
    await cities_collection.deleteMany({});

    console.log("Deleted old version of documents from the cities collection")

    await cities_collection.insertMany(cities_data);

    // Replace all documents in the deliverypoints_collection with the new data
    await deliverypoints_collection.deleteMany({});

    console.log("Deleted old version of documents from the delivery points collection")

    await deliverypoints_collection.insertMany(deliverypoints_data);

    console.log("Inserted documents into the delivery points collection");

  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the MongoDB server

    await client.close();
    console.log("Closed connection to server");
  }
}
