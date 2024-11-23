import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import db from './db/db.js';
import authRoute from './route/authroute.js';
import adminRoute from './route/adminroute.js';
import postRoute from './route/postroute.js';
import initSocket from './socket/socket.js';
import path from 'path'; 
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get the filename and dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO and pass the server
const io = initSocket(server);

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Serve the uploaded files statically from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Attach io instance to req object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api', postRoute);

// Start the server
server.listen(PORT, async () => {
  try {
    await db(); // Ensure DB connection
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
});
