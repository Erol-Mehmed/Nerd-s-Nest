import express from 'express';
import User from '../sequelize/models/user';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  console.log(users);
});

console.log('home router');
export default router;
