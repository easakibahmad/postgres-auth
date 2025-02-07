import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername, retrieveUsers } from '../models/userModel';

// Service to create a new user
export const registerUserService = async (username: string, password: string) => {
  try {
    const userExists = await getUserByUsername(username);
    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = await createUser(username, password);
    return newUser;

  } catch (error: any) {
    throw new Error(error.message || 'Error in creating user');
  }
};


// Service to get all users
export const getAllUsers = async () => {
  try {
    const result = await retrieveUsers();
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

// User login
export const loginUserService = async (username: string, password: string) => {
  const user = await getUserByUsername(username);

  if (!user) {
    throw new Error('User not found');
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate the JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });

  return { token, user };
};
