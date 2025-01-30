import { NextFunction, Request, Response } from 'express';
import { getAllUsers, registerUserService } from '../services/userService';

// Controller function for registering a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const newUser = await registerUserService(username, password);
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for getting all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
