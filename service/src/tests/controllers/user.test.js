const request = require('supertest');

const app = require('../../index');
const User = require('../../models/user');
const devUsers = require('../../constants/devUsers');
const { beforeAllTests, afterAllTests } = require('../../helpers/database');

beforeAll(async () => {
    await beforeAllTests();
});

afterAll(async () => {
    await afterAllTests();
});

describe('User controller test', () => {
    it('#Test update method; PUT /api/user/:id; ', async () => {
        const userData = { ...devUsers[0], email: 'xhc044x@gmail.com' };
        const user = await User.findOneAsync({ email: devUsers[0].email });
        const response = await request(app)
            .put(`/api/user/${user._id}`)
            .send(userData);

        expect(response.body.success).toBe(true);
    });
    
    it('#Test delete method; Delete /api/user/:id; ', async () => {
        const user = await User.findOneAsync({ email: devUsers[1].email });
        const response = await request(app)
            .delete(`/api/user/${user._id}`);

        expect(response.body.success).toBe(true);
    });
});