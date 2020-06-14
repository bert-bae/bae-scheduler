import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

const app = express();
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

router.get('/hello', (req, res, next) => {
  res.status(200).json({
    test: 'hello world',
  });
});

app.use('/', router);

export default app;
