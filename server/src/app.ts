import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { AuthController } from './controller';
import { UserRoutes, PersonRoutes } from './routes';

const app = express();
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

router.use('/user', UserRoutes);
router.use(
  '/person',
  AuthController.passport.authenticate('jwt', { session: false }),
  AuthController.isAuthenticated,
  PersonRoutes
);

app.use('/', router);

export default app;
