import express from 'express';
import 'dotenv/config';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import balanceRouter from './routes/balance.js';
import transactionsRouter from './routes/transaction.js';
import bodyParser from 'body-parser';
import cors from 'cors';


//Here is the Initialize the config file
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));



console.log(process.env.WORLD);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/balance', balanceRouter);
app.use('/transaction', transactionsRouter);

app.listen(3000);

export default app;