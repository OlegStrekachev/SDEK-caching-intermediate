import querystring from "querystring";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

// Define the parameters for the request
const params = querystring.stringify({
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

export async function getAccessToken() {

  try {
    const response = await fetch(process.env.API_SDEK_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (!json.access_token) {
      throw new Error("No access token found in response!");
    }

    return json.access_token;
  } catch (error) {
    console.error("error in getAccessToken: ", error);
  }
}
