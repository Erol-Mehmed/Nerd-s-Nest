import express from 'express';
import db  from '../sequelize/models/index.js';
const router = express.Router();

router.get('/', async () => {
  const users = await db.User.findAll();
  console.log(users);
});

console.log('home.js:', db.User);
export default router;
