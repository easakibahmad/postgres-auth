import express from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.get('/users', getUsers);
router.post('/login', loginUser);
router.get('/profile', verifyToken, (req: any, res: any) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
  });

export default router;
