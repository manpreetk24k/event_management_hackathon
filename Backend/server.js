import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';


dotenv.config();

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import { init as initSocket } from './utils/socket.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';


import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js';
import registrationRoutes from './routes/registrations.js';
import { eventRegistrationRouter } from './routes/registrations.js';
import notificationRoutes from './routes/notifications.js';


connectDB();

const app = express();
const server = createServer(app);


initSocket(server);

app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later' },
});
app.use('/api/', limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/events/:id', eventRegistrationRouter);
app.use('/api/registrations', registrationRoutes);
app.use('/api/notifications', notificationRoutes);


app.get('/', (req, res) => {
  res.json({ success: true, message: 'MNSS Event Management API is running' });
});


app.use(errorHandler);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
