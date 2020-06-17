import * as express from 'express';
import { PersonController } from '../controller';

const router = express.Router();

router.get('/', PersonController.getAll);

router.get('/:personId');

router.post('/', PersonController.createNewPerson);

router.put('/:personId');

export default router;
