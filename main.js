require('dotenv').config()

const express = require('express')
const session = require('express-session');
const fileStore = require('session-file-store')(session);
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

app.use(cors());
app.use(cookieParser());
app.use(session({
  store: new fileStore(),
  secret: 'dcad6f9d-5493-4675-957c-828aae0b67af',
  saveUninitialized: true,
  resave: false
}));

// Allow headers
app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

server.listen(port, () => console.log(`Example app listening on port ${port}!`))