import * as express from 'express';
import { EventController } from '../controller';

const router = express.Router();

router.get('/', EventController.getEventsByPerson);

router.get('/:eventId', EventController.getEventRecord);

router.post('/', EventController.createEventRecord);

router.put('/:eventId', EventController.updateEventRecord);

export default router;
