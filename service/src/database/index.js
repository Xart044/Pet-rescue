const mongoose = require('mongoose')
const bluebird = require('bluebird')

const config = require('../../config');

const { database: { port, domain, name } } = config;

bluebird.promisifyAll(mongoose);
mongoose.Promise = bluebird;

const dbUri = `mongodb://${domain}:${port}/${name}`;

const database = async () => {
    try {
        await mongoose.connect(dbUri, { useMongoClient: true });
        console.log(`Database is connected: ${dbUri}`);
    } catch (error) {
        console.log(`Error on database connect: `, error);
    }
};
	
module.exports = database;