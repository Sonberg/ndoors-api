require('dotenv').config()

const express = require('express')
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const routes = require('./routes')
const cors = require('cors')
const socketIo = require('socket.io')

const app = express()
const server = require('http').Server(app);

const port = process.env.PORT || 3001;
const io = socketIo(server)

app.use(cors({
  credentials: true,
  origin: true
}));

app.use(cookieParser());
app.use(session({
  store: new redisStore(),
  secret: 'dcad6f9d-5493-4675-957c-828aae0b67af',
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 * 24 * 2, // 2 days
    secure: process.env.NODE_ENV === 'production'
  },
  resave: false
}));

// Socket
app.set('io', io)

// Logging
app.use(morgan('dev'));

// Authentication
require('./authentication').init(app)

// Parse request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.use('/', routes);

server.listen(port, () => console.log(`App listening on port ${port}!`))