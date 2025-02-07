import { NextFunction, Request, Response } from 'express';
import { getAllUsers, loginUserService, registerUserService } from '../services/userService';
import bcrypt from 'bcryptjs';

// Registering a new user
export const registerUser = async (req: Request, res: Response): Promise<void>  => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUserService(username, hashedPassword);
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (error: any ) {
    console.error(error);
    res.status(500).json({ message: error?.message || 'Server error' });
  }
};

// Getting all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginUserService(username, password);

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);

    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
