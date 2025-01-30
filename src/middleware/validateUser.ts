import { Request, Response, NextFunction } from 'express'; // Import Express types
import { body, validationResult } from 'express-validator';

// Validation middleware
export const validateUser = [
  body('username')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req: Request, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
