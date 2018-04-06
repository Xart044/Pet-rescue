const request = require('supertest');

const app = require('../../index');
const Shelter = require('../../models/shelter');
const { beforeAllTests, afterAllTests } = require('../../helpers/database');

beforeAll(async () => {
    await beforeAllTests();
});

afterAll(async () => {
    await afterAllTests();
});

describe('Admin-shelter controller test', () => {
    const newShelterData = {
        volunteers: [],
        name: 'name',
        description: 'description',
        location: [30, 50],
        email: 'xhc044x@gmail.com',
        phone: '+380974758219'
    };

    it('#Test create method; POST /api/shelter; ', async () => {
        const response = await request(app)
            .post(`/api/shelter`)
            .send(newShelterData);

        expect(response.body.success).toBe(true);
    });
    
    it('#Test delete method; DELETE /api/shelter/:id; ', async () => {
        const shelter = await Shelter.findOneAsync();
        const response = await request(app)
            .delete(`/api/shelter/${shelter._id}`);

        expect(response.body.success).toBe(true);
    });
});