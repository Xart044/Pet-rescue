global.Promise = require("bluebird");
const mongoose = require('mongoose');

const config = require('../../config/index');
const devUsers = require('../constants/devUsers');
const devPetTypes = require('../constants/devPetTypes');
const { register: createUser } = require('../controllers/user');
const { create: createPetType } = require('../controllers/admin-petTypes');

const { 
    database: { port: dbPort, domain: dbDomain, name }
} = config;

const dbUri = `mongodb://${dbDomain}:${dbPort}/${name}`;

const noop = () => {};

/**
 * Function for filling database with standart data
 */
const fillDatabaseWithData = async () => {
    await Promise.all(devUsers.map(async (user) => {
        console.log(`Creating user ${user.email} of role ${user.role} with password ${user.password}`);
        await createUser({ body: { ...user } }, { send: noop }, noop);
    }));
    await Promise.all(devPetTypes.map(async (type) => {
        console.log(`Add pet type ${type.name}`);
        await createPetType({ body: { ...type } }, { send: noop }, noop);
    }));
};

const beforeAllTests = async () => {
    await mongoose.createConnection(dbUri);
    await fillDatabaseWithData();
};

const afterAllTests = async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
};

module.exports = { fillDatabaseWithData, beforeAllTests, afterAllTests };