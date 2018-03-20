const express = require('express');
const database = require('./database');
const config = require('./../config');
const routes = require('./routes');
/**
 * Middlewares
 */
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');

const {
    api: {
        protocol: appProtol,
        domain: appDomain,
        port: appPort
    }
} = config;

const app = express();
database();

if (process.env.ENV === 'development') {
    app.use(logger('dev'))
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api', routes);

app.listen(appPort, () => console.log(`Server starting on port: ${appProtol}://${appDomain}:${appPort}`));