import * as express from 'express';
import UserController from '../controller/user-controller';

const router = express.Router();

router.post('/login', UserController.verifyUser);

router.post('/create', UserController.createUser);

router.put('/', (req, res, next) => {
  console.log('/user put endpoint');
});

export default router;
