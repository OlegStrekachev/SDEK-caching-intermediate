import { MongoClient } from "mongodb";
import client from "./server.js";
import dotenv from "dotenv";

dotenv.config();

// Search for delivery points

export async function destinationQuery(req, res) {
  try {
    const { q } = req.query;
    const { city } = req.query;
    const { path } = req;

    console.log(req.query, q, city, path);
    const PVZ_points = await searchDeliveryPoints(q, city, path);

    console.log(PVZ_points);

    // const formattedPVZ_points = PVZ_points.map((point) => ({
    //   id: point._id,
    //   name: point.name,
    //   address: point.address,
    // }));

    return res.json(PVZ_points);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function searchDeliveryPoints(query, city, path) {
  let type;
  if (path === "/pvz") {
    type = "PVZ";
  } else if (path === "/postamat") {
    type = "POSTAMAT";
  } else {
    throw new Error("Invalid path");
  }

  const deliveryPoints = await client
    .db(process.env.MONGODB_DBNAME)
    .collection(process.env.MONGODB_COLLECTION_DELIVERYPOINTS)
    .aggregate([
      {
        $match: {
          type: type,
          "location.city_code": parseInt(city),
          ...(query ? { name: { $regex: new RegExp(`${query}`, "i") } } : {}),
        },
      },
      {
        $limit: 25,
      },
    ])
    .toArray();

  return deliveryPoints;
}
