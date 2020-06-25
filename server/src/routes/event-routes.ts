import * as express from 'express';
import { EventController } from '../controller';

const router = express.Router();

router.get('/');

router.get('/:eventId');

router.post('/');

router.put('/:eventId');

export default router;
