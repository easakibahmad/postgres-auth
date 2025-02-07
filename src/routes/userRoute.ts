import express from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.get('/users', getUsers);
router.post('/login', loginUser);

export default router;
