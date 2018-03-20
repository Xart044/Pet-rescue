const express = require('express');
const database = require('./database');
const config = require('./../config');

const {
    api: {
        protocol: appProtol,
        domain: appDomain,
        port: appPort
    }
} = config;

const app = express();
database();

/**
 * Middlewares
 */
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');

if (process.env.ENV === 'development') {
    app.use(logger('dev'))
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

/**
 * Routes
 */
const routes = require('./routes');

app.use('/api', routes);

app.listen(appPort, () => console.log(`Server starting on port: ${appProtol}://${appDomain}:${appPort}`));