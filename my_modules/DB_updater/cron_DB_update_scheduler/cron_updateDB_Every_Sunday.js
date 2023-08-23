import { writeToMongoDB } from "../mongoDB_write_toDB_functions/mongoDB_Write_toDB_function.js";
import cron from "node-cron";

// Schedule the cron job to run every Sunday at 00:00

const cronJob = cron.schedule("0 0 * * 0", () => {
  writeToMongoDB();
});

// Start the cron job

cronJob.start();


