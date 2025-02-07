import { NextFunction, Request, Response } from 'express';
import { getAllUsers, registerUserService } from '../services/userService';
import bcrypt from 'bcryptjs';
import pool from '../config/database';

// Controller function for registering a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    // Check if the user already exists
    const userExists = await pool.query('SELECT * FROM authschema.users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUserService(username, hashedPassword);
    
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
