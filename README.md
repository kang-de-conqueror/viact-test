## Technical Stack:
- Backend: Nest.js
- Frontend: Next.js
- Database: MySQL
- Caching: Redis

## Usage
### Back-end

Make sure you updated your configuration inside `.env` file in `be` folder

1. Go to the `backend` directory by running `cd be`.

2. Install the required dependencies by running `npm install` (Remember to create database first)

3. Start db container and redis by running `docker-compose up -d`

4. Run migration script by using `npm run migration:run`

5. Seed data by using `npm run init-data`

6. Start the back-end server by running `npm run start`.

7. Open your web browser and navigate to `http://localhost:5000/graphql` to go the the graphql playground to test the api.

### Front-end

1. Go to the `frontend` directory by running `cd fe`.

2. Install the required dependencies by running `npm install`.

3. Start the front-end server by running `npm run dev`.

4. Open your web browser and navigate to `http://localhost:3000` to view the front-end.
