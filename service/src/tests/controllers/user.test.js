const request = require('supertest');

const app = require('../../index');
const devUsers = require('../../constants/devUsers');
const { beforeAllTests, afterAllTests } = require('../../helpers/database');

beforeAll(async () => {
    await beforeAllTests();
});

afterAll(async () => {
    await afterAllTests();
});

describe('User controller test', () => {
    it('#Test register method; POST /api/auth/register; ', async () => {
        const userData = {...devUsers[0], email: 'xhc044x@gmail.com'};
        const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(response.body.success).toBe(true);
    });
});