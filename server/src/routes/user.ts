import * as express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('/user get endpoint');
});

router.post('/', (req, res, next) => {
  console.log('/user post endpoint');
});

router.put('/', (req, res, next) => {
  console.log('/user put endpoint');
});

export default router;
