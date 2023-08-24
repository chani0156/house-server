
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import { sequelize } from './config/database';
import dotenv from 'dotenv';
import { handleInternalServerError, handleNotFoundError } from './middleware/errorMiddleware';

const cors = require('cors'); 
const app = express();


//CONFIGURATION
const corsOptions = {
    origin: 'http://localhost:3001',
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', router);
app.use(handleNotFoundError);
app.use(handleInternalServerError);

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

