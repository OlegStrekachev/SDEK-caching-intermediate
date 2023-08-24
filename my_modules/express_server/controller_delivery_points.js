import client from "./server.js";
import dotenv from "dotenv";

dotenv.config();

// Search for delivery points

export async function destinationQuery(req, res) {
  try {
    const { q } = req.query;
    const { city } = req.query;
    const { path } = req;

    // console.log(req.query, q, city, path);

    const delivery_points = await searchDeliveryPoints(q, city, path);

    // console.log(delivery_points);

    return res.json(delivery_points);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async function searchDeliveryPoints(query, city, path) {

  // conditional assignment of type depending on the path of the request (pvz or postamat)
  let type;
  if (path === "/pvz") {
    type = "PVZ";
  } else if (path === "/postamat") {
    type = "POSTAMAT";
  } else {
    throw new Error("Invalid path");
  }

  // search for delivery points in the database

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
