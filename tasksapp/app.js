const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load Keys
const keys = require('./config/keys');

// Load Routes
const users = require('./routes/user.route');
const tasks = require('./routes/task.route');

// Set mongoose Promise to global Promise
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Connection Error: ', err));

// Log all mongoose queries in server
mongoose.set('debug', true);

// Initialize app
const app = express();

// passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// cors Middleware
app.use(cors());

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/api/user', users);
app.use('/api/task/', tasks);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});