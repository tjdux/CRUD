import express from 'express';
import userRouter from './routers/userRouter.js'
import postRouter from './routers/postRouter.js'
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})