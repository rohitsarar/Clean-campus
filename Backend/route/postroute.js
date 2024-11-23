import express from 'express';
import { createPost, posts } from '../controller/posts.js';
import multer from 'multer';

// Use multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

const postRoute = express.Router();

// POST route for creating a post with a file upload
postRoute.post('/post', upload.single('photo'), createPost);

// GET route for fetching all posts (no file upload needed here)
postRoute.get('/posts', posts);

export default postRoute;
