/**
 * Dependecies
 */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import bb from 'express-busboy';

/**
 * Routes
 */
import routesArticles from './routes';

/**
 * Config Instance of Mongo
 */
const dbURI = `mongodb://${process.env.HOST_DB}:${process.env.PORT_DB}/${
  process.env.NAME_DB
}`;

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true }
);

/**
 * Config Server
 */
const app = express();

// bb.extend(app, { upload: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
// dotenv.config({ path: '../.env' });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

/**
 * Routes Api
 */
app.use('/api/v1', routesArticles);

/**
 * Handdle Error
 */
app.use((err, res) => {
  res.status(404).json({ 
      success: false,
      message: 'Resource not found' 
    });
});

/**
 * Init Server
 */
app.listen(process.env.PORT_SERVER, () => {
    console.log(`Api started on port ${process.env.PORT_SERVER} with environment ${process.env.ENV}`);
    console.log(`Data Base: ${dbURI}`);
});

export default app;