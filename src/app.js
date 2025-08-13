import express from 'express';
import cors from 'cors';
import 'express-async-errors';
// import authRoutes from './routes/auth.routes.js';
// import itemRoutes from './routes/item.routes.js';
// import bookingRoutes from './routes/booking.routes.js';
// import reviewRoutes from './routes/review.routes.js';
// import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/reviews', reviewRoutes);

// app.use(notFound);
// app.use(errorHandler);

export default app;