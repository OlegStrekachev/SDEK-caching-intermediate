import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import router from "./express_router.js";

const client = new MongoClient(process.env.MONGODB_URL);

const app = express();

app.use(cors({ origin: "*" }));

app.use('/api', router);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
    client.connect();
  });
  
export default client;