import { getAccessToken } from "../sdek_token_retriever/SDEK_token_fetch.js";
import dotenv from "dotenv"; 

dotenv.config();

// Define function to make an authorized request to SDEK API and return the data

async function authorizedRequest(token, api_endpoint) {
  try {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    const response = await fetch(api_endpoint, requestOptions);
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
   
    return data;

  } catch (err) {
    console.error("Error: ", err);
  }
}

// Define function to fetch data from SDEK API

export async function fetchData() {
  const token = await getAccessToken(); // get the access token

  const cities_data = await authorizedRequest(token, process.env.API_SDEK_CITIES); // make an authorized request to get cities data
  const deliverypoints_data = await authorizedRequest(token, process.env.API_SDEK_DELIVERYPOINTS); // make an authorized request to get delivery points data

  return { cities_data, deliverypoints_data }; // return an object with both data objects
}