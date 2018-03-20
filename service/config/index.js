let config = null;

switch (process.env.ENV) {
    case 'production':
        config = require('./production.json');
        break;
    case 'test':
        config = require('./test.json');
        break;
    case 'development':
    default:
        config = require('./development.json');
        break;
}

module.exports = config;