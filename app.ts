import createError from 'http-errors';
import express from 'express';
import auth from './server/middleware/auth';
// import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { graphqlHTTP } from 'express-graphql';
import { schema } from './src/schema/schema';
import { firstSchema } from './server/schema/schema';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://dbnurudeen:nurudeen992@cluster0.89qyi.mongodb.net/week9', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('connected to database');
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.use("/graphql2", graphqlHTTP((req) => ({
  schema: firstSchema,
  context: auth(req),
  graphiql: true
})));

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
