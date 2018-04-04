global.Promise = require("bluebird");
const mongoose = require('mongoose');

const config = require('../../config/index');
const devUsers = require('../constants/devUsers');
const devPetTypes = require('../constants/devPetTypes');
const devPetStatuses = require('../constants/devPetStatuses');
const { register: createUser } = require('../controllers/user');
const { create: createPetType } = require('../controllers/admin-petTypes');
const { create: createPetStatus } = require('../controllers/admin-petStatuses');

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
        await createPetType({ body: { ...type } }, { send: noop }, noop);
    }));
    console.log(`Add pet types: ${JSON.stringify(devPetTypes.map(el => el.name))}`);
    await Promise.all(devPetStatuses.map(async (status) => {
        await createPetStatus({ body: { ...status } }, { send: noop }, noop);
    }));
    console.log(`Add pet statuses: ${JSON.stringify(devPetStatuses.map(el => el.name))}`);
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