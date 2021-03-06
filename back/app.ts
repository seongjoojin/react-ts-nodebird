import express from 'express';
import postRouter from './routes/post';

const app = express();

app.get('/', (req, res) => {
  res.send('hello express')
})

app.use('/post',postRouter);

app.listen(3065, () => {
  console.log('서버 실행');
});