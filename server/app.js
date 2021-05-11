const express = require('express');
const app = express();
const port = process.env.port || 3001;
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Project2Final'