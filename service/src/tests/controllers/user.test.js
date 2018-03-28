const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../index');
const devUsers = require('../../constants/devUsers');
const config = require('../../../config/index');
const { 
    database: { port: dbPort, domain: dbDomain, name }
} = config;

const dbUri = `mongodb://${dbDomain}:${dbPort}/${name}`;

beforeAll(async () => {
    await mongoose.createConnection(dbUri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe('User controller test', () => {
    it('#Test create method; POST /api/auth/register; ', async () => {
        const userData = devUsers[1];
        const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(response.body.success).toBe(true);
    });
});