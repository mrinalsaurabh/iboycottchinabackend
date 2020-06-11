import createError from 'http-errors';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import expressValidator from 'express-validator';//req.checkbody()
import mongoConfig from '../configs/mongo-config';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import alternatesRouter from './routes/alternates';
import productsRouter from './routes/products';

//mongodb://heroku_8bd94qrf:irstf0rv1ds970eebtislm0apf@ds029638.mlab.com:29638/heroku_8bd94qrf
connect(mongoConfig, { useNewUrlParser: true, useCreateIndex: true, }, function (error) {
  if (error) throw error
  console.log(`connect mongodb success`);
});

var app = express()
app.use(cors())

const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Express validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.lenght) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

//set static dir
app.use(express.static(join(__dirname, 'public')));

//routers
app.use('/', indexRouter);
app.use('/api/products', productsRouter);
app.use('/api/alternates', alternatesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.log(err);
  res.status(err.status || 500).json(err);
});

export default app;
