import express from 'express';
import { settings } from "./settings.js";
import { connectToDatabase, retrieveSequalize } from './utils/preload_utils.js';

import homeRouter from './src/routes/home.js'

const app = express();
app.use('/', homeRouter);

export const sequalize = retrieveSequalize();
connectToDatabase(sequalize);

app.listen(settings.app.port, () => {
  console.log('Server started at port 3000');
});
