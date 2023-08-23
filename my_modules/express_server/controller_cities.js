import { MongoClient } from "mongodb";
import client from "./server.js";
import dotenv from "dotenv";

dotenv.config();

// Search for cities

export async function cityQuery(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.length <= 0) {
      return res.json([]);
    }

    const cities = await searchCities(q);

    const formattedCities = cities.map((city) => ({
      id: city.code,
      text: `${city.city}, ${city.region}, ${city.country}`,
    }));

    return res.json(formattedCities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function searchCities(query) {
  const cities = await client
    .db(process.env.MONGODB_DBNAME)
    .collection(process.env.MONGODB_COLLECTION_CITIES)
    .aggregate([
      {
        $match: { city: { $regex: new RegExp(`${query}`, "i") } },
      },
      {
        $project: {
          _id: 0,
          code: 1,
          city: 1,
          region: 1,
          country: 1,
        },
      },
      {
        $limit: 25,
      },
    ])
    .toArray();

  return cities;
}