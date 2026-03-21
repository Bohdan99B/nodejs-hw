import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  requestResetEmail,
  resetPassword,
  refreshUserSession,
  registerUser
} from '../controllers/authController.js';
import {
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  registerUserSchema
} from '../validations/authValidation.js';

const authRouter = Router();

authRouter.post('/auth/register', celebrate(registerUserSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);
authRouter.post('/auth/refresh', refreshUserSession);
authRouter.post('/auth/logout', logoutUser);
authRouter.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail
);
authRouter.post('/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);

export default authRouter;
