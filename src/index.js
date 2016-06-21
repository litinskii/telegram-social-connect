import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import router from './router';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import auth from './auth';

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_DB_URI);
mongoose.Promise = Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
auth();
app.use('/', router);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
  .end();
});

app.listen(port);
