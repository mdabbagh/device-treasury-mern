const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/dtreasury_dev", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we connected");
});

// SERVER
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersRoutes = require('./routes/users');
const devicesRoutes = require('./routes/devices');
const authRoutes = require('./routes/auth');

app.use('/api/users', usersRoutes);
app.use('/api/devices', devicesRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log('server started on port ' + PORT);
});