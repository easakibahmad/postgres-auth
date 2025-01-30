import { createUser, retrieveUsers } from '../models/userModel';

// Service to create a new user
export const registerUserService = async (username: string, password: string) => {
  try {
    // Interact with the model to create the user
    const newUser = await createUser(username, password);
    return newUser;
  } catch (error) {
    throw new Error('Error in creating user');
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
