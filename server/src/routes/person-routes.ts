import express from 'express';
import { PersonController, AuthController } from '../controller';

const router = express.Router();

router.get('/', PersonController.getAll);

router.get('/:personId', PersonController.getOne);

router.post('/', PersonController.createNewPerson);

router.put('/:personId', PersonController.updatePerson);

export default router;
