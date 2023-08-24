
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import { sequelize } from './config/database';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/errorMiddleware';
import morgan from 'morgan';
import path from 'path';
const cors = require('cors'); 
const app = express();
import fs from 'fs';


//CONFIGURATION
const ORIGIN = process.env.ORIGIN
const corsOptions = {
    origin: ORIGIN,
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorMiddleware);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// Use morgan middleware for request logging
app.use(morgan('combined', { stream: accessLogStream }));


dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

