import { Router } from 'express';
import { login, decrypt } from '../controllers/authController';
import { check } from 'express-validator';

const router = Router();

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  login
);

router.post(
  '/decrypt',
  [
    check('token').notEmpty().withMessage('Token is required')
  ],
  decrypt
);

export default router;
