const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const authGuard = require('./middlewares/auth.guard');
const api = require('./api');

const app = express();
// set up middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
// set basic auth guard on all routes
app.use(authGuard.basicAuth);
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'topolino',
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
