const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures for .env files
require('dotenv').config();

// configure express server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// parse send/receive json
app.use(express.json());

// uri from mongoDB goes here
const uri = process.env.ATLAS_URI;

// connect to database
mongoose.connect(uri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true 
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established");
});

// require route files
const projectRouter = require('./routes/project');
const adminRouter = require('./routes/admin');

// use route files
app.use('/projects', projectRouter);
app.use('/admin', adminRouter);

// start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});