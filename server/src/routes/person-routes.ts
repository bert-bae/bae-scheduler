import * as express from 'express';
import { PersonController, AuthController } from '../controller';

const router = express.Router();

router.get(
  '/',
  AuthController.passport.authenticate('jwt', { session: false }),
  PersonController.getAll
);

router.get(
  '/:personId',
  AuthController.passport.authenticate('jwt', { session: false }),
  PersonController.getOne
);

router.post(
  '/',
  AuthController.passport.authenticate('jwt', { session: false }),
  PersonController.createNewPerson
);

router.put(
  '/:personId',
  AuthController.passport.authenticate('jwt', { session: false }),
  PersonController.updatePerson
);

export default router;
