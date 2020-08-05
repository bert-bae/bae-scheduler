import app from './app';
import dotenv from 'dotenv';

dotenv.config();

app.get('/', (req, res) => {
  res.status(200).json({
    hello: 'world',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
