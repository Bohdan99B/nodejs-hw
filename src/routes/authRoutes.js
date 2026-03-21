import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema
} from '../validations/authValidation.js';

const authRouter = Router();

authRouter.post('/auth/register', celebrate(registerUserSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);
authRouter.post('/auth/refresh', refreshUserSession);
authRouter.post('/auth/logout', logoutUser);

export default authRouter;
