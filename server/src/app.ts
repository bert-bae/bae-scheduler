import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { AuthController } from './controller';
import { UserRoutes, PersonRoutes, EventRoutes } from './routes';

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
router.use(
  '/person/:personId',
  AuthController.passport.authenticate('jwt', { session: false }),
  AuthController.isAuthenticated,
  EventRoutes
);

app.use('/', router);

export default app;
