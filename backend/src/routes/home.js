import express from 'express';
import User from '../sequelize/models/user.js';
const router = express.Router();

router.get('/', async () => {
  const users = await User.findAll();
  console.log(users);
});

console.log('home.js:', User);
export default router;
