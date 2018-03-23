const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');

const database = require('./database');
const routes = require('./routes');
const {strategy} = require('../config/passport');

const {
    api: {
        protocol: appProtol,
        domain: appDomain,
        port: appPort
    }
} = require('../config');

const app = express();
database();

/**
 * Middlewares
 */

if (process.env.ENV === 'development') {
    app.use(logger('dev'));
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(passport.initialize());
strategy(passport);

/**
 * Routes
 */

app.use('/api', routes);

app.listen(appPort, () => console.log(`Server starting on port: ${appProtol}://${appDomain}:${appPort}`));