const mongoose = require('mongoose');
const bluebird = require('bluebird');
const devUsers = require('../constants/devUsers');
const { create } = require('../controllers/user');

const config = require('../../config');

const { database: { port, domain, name } } = config;

bluebird.promisifyAll(mongoose);
mongoose.Promise = bluebird;

const dbUri = `mongodb://${domain}:${port}/${name}`;

const noop = () => {};

const database = async () => {
    try {
        await mongoose.connect(dbUri, { useMongoClient: true });
        if (process.env.ENV === 'development') {
            devUsers.forEach(user => {
                console.log(`Creating user ${user.email} of role ${user.role} with password ${user.password}`);
                create({ body: { ...user } }, { send: noop }, noop);
            });
        }
        console.log(`Database is connected: ${dbUri}`);
    } catch (error) {
        console.log(`Error on database connect: `, error);
    }
};
	
module.exports = database;