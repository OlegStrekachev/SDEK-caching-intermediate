# SDEK Proxy Chain API 🚀

The SDEK Proxy Chain API is a caching solution between the new SDEK API 2.0 and the delivery cost calculation interface on a website. As SDEK transitions from its old direct client request system to their new API, this proxy ensures efficient and seamless frontend interactions.

## Features 🌟
1. **Token Authentication**: Handles authentication tokens using provided test keys. Easily switch between test and production API endpoints.
2. **Data Management**: Downloads and updates the city database, delivery points (PVZ), and postamats. Data stored in MongoDB.
3. **Search Interfaces**: Offers endpoints for cities, PVZs, and postamats with user input suggestions.

## Endpoints 🌐
1. `/cities?q=...`: Yields up to 25 matching cities (returning city ID and name in the "City, Region, Country" format).
2. `/pvz?city=ID&q=...`: Fetches up to 25 matching PVZs for the input city.
3. `/postamat?city=ID&q=...`: Displays up to 25 matching postamats for the given city.

**Note**: No data is returned if `q` or `city` are omitted.

## Setup 🚀
### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation Steps
1. Clone the repository:
\```bash
git clone https://github.com/yourusername/SDEK-Proxy-Chain-API.git
\```

2. Go to the project directory and install dependencies:
\```bash
cd SDEK-Proxy-Chain-API
npm install
\```

3. Set up the `.env` file with environment variables:
\```
SDEK_API_ENDPOINT=<test_or_production_endpoint>
SDEK_API_KEY=<your_sdek_api_key>
MONGODB_URI=<your_mongo_uri>
\```

4. Start the server:
\```bash
npm start
\```

## Development Environment Variables 📁

```env
# Credentials for Bearer Token
CLIENT_ID=EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI
CLIENT_SECRET=PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG

# SDEK API endpoints
API_SDEK_TOKEN=https://api.edu.cdek.ru/v2/oauth/token
API_SDEK_CITIES=https://api.cdek.ru/v2/location/cities
API_SDEK_DELIVERYPOINTS=https://api.cdek.ru/v2/deliverypoints

# mongoDB connection
MONGODB_URL=mongodb://127.0.0.1:27017
MONGODB_DBNAME=SDEK
MONGODB_COLLECTION_CITIES=Cities
MONGODB_COLLECTION_DELIVERYPOINTS=delivery_points

# express endpoint
EXPRESS_PORT=3000
EXPRESS_HOST=127.0.0.1
```

## Frontend Workflow 🖥️
- Users input their city name in a `select2` selector, getting suggestions (`select2 ajax` hitting `/cities?q=`).
- After choosing a city, users select a delivery type (PVZ or POSTAMAT).
- Based on the delivery type, users then pick a specific PVZ or postamat (`select2 ajax` querying `/pvz?city=ID&q=` or `/postamat?city=ID&q=`).

## Contributions 🤝
For major changes, kindly open an issue first. Pull requests are welcomed.

## License 📄
Licensed under the MIT License. Refer to [LICENSE.md](LICENSE.md) for details.
