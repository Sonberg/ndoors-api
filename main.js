const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
const routes = require('./routes')
const morgan = require('morgan')

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Loggong
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))