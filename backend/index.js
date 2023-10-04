import express from 'express';
import { settings } from "./settings.js";
import { connectToDatabase, retrieveSequalize } from './utils/preload_utils.js';

const app = express();
export const sequalize = retrieveSequalize();
connectToDatabase(sequalize);

app.listen(settings.app.port, () => {
  console.log('Server started at port 3000');
});
