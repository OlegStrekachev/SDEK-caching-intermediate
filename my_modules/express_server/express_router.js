import { Router } from "express";
import { cityQuery} from "./controller_cities.js";
import { destinationQuery } from "./controller_delivery_points.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/cities", cityQuery);

router.get("/pvz", destinationQuery);

router.get("/postamat", destinationQuery);


export default router;
