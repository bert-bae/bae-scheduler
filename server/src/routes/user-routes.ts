import express from 'express';
import { UserController } from '../controller';

const router = express.Router();

router.post('/login', UserController.authenticateUser);

router.post('/', UserController.createUser);

router.put('/', (req, res, next) => {
  console.log('/user put endpoint');
});

export default router;
