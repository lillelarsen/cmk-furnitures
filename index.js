require('dotenv').config();
const express = require('express');
const app = express();

// CONFIG
require('./config/session')(app);
require('./config/flash')(app);
require('./config/parser')(app);
require('./config/locals')(app);
require('./config/views')(app);


// ROUTES
require('./routes/index')(app);

// SERVER
require('./server/server')(app);