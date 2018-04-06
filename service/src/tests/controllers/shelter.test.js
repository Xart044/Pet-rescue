const request = require('supertest');

const app = require('../../index');
const Shelter = require('../../models/shelter');
const User = require('../../models/user');
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

    it('#Test update method; PUT /api/shelter/:id; ', async () => {
        const shelter = await Shelter.findOneAsync();
        const updatedShelterData = { name: 'new' };
        const response = await request(app)
            .put(`/api/shelter/${shelter._id}`)
            .send(updatedShelterData);

        expect(response.body.success).toBe(true);
    });

    it('#Test addShelter method; POST /api/shelter/:id/volunteers; ', async () => {
        const shelter = await Shelter.findOneAsync();
        const users = await User.findAsync();
        const volunteers = users.map(user => user._id);
        const updatedShelterData = { volunteers };
        const response = await request(app)
            .post(`/api/shelter/${shelter._id}/volunteers`)
            .send(updatedShelterData);

        expect(response.body.success).toBe(true);
    });
    
});