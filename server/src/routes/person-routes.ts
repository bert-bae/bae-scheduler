import * as express from 'express';
import { PersonController } from '../controller';

const router = express.Router();

router.get('/');

router.get('/:personId');

router.post('/');

router.put('/:personId');

export default router;