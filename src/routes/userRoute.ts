import express from 'express';
import { getUsers, registerUser } from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.get('/users', getUsers);

export default router;
