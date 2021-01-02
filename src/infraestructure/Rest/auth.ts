import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { username, password, registration } = req.body;

     


      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };


      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signout',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Signout the user
      req.session = null;
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };
