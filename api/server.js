import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import usersRoutes from './routes/user.route.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB database"))
    .catch((err) => console.log("Failed to connect to MongoDB database. Error: " + err));

app.use("/api", usersRoutes);

app.listen(process.env.PORT);