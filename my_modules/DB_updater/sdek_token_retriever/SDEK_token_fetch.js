import querystring from "querystring";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

// Using query string to format the parameters for the request

const params = querystring.stringify({
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

// Retrieve the access token

export async function getAccessToken() {

  try {
    const response = await fetch(process.env.API_SDEK_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
// using params to format the body of the request
      body: params,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (!json.access_token) {
      throw new Error("No access token found in response!");
    }
// return the access token
    return json.access_token;
  } catch (error) {
    console.error("error in getAccessToken: ", error);
  }
}
