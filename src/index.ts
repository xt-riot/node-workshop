import express, { Express } from 'express';
import { registerRoutes } from './routes';
import { registerMiddlewares } from './middlewares';
import { initialiseDatabase } from './middlewares/database.middleware';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const server: Express = express();
const port = process.env.PORT || 1337;

registerMiddlewares(server);
registerRoutes(server);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
initialiseDatabase(mongoose).then(_ => server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})).catch(error => {
  console.error('Error connecting to the database. Server didn\'t start', error);
});

/*
curl "http://localhost:1337/createTransaction" -X POST -H "Content-Type: application/json" -d "{ \"targetAccountId\": \"1\", \"amount\": 1, \"sourceAccountId\": \"1\", \"currency\": \"USD\" }"
curl "http://localhost:1337/createAccount" -X POST -H "Content-Type: application/json" -d "{ \"firstName\": \"test\", \"lastName\": 1, \"country\": \"1\", \"email\": \"test@test.com\", \"currency\": \"USD\" }"

18f8135f-94f4-9b3d-267e-ad0491acc5a6 test test
18f81366-bfaa-5dd7-02a4-08dff3047377 konstantinos karachristos
*/