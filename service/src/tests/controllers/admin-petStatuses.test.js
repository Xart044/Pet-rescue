const request = require('supertest');

const app = require('../../index');
const PetStatus = require('../../models/petStatus');
const devPetStatuses = require('../../constants/devPetStatuses');
const { beforeAllTests, afterAllTests } = require('../../helpers/database');

beforeAll(async () => {
    await beforeAllTests();
});

afterAll(async () => {
    await afterAllTests();
});

describe('Pet status controller test', () => {
    it('#Test create method; POST /api/pet/status; ', async () => {
        const petStatusData = { name: 'new' };
        const response = await request(app)
            .post(`/api/pet/status`)
            .send(petStatusData);

        expect(response.body.success).toBe(true);
    });
    
    it('#Test update method; PUT /api/pet/status/:id; ', async () => {
        const petStatusData = { name: 'new' };
        const petStatus = await PetStatus.findOneAsync({ name: devPetStatuses[0].name });
        const response = await request(app)
            .put(`/api/pet/status/${petStatus._id}`)
            .send(petStatusData);

        expect(response.body.success).toBe(true);
    });

    it('#Test delete method; DELETE /api/pet/status/:id; ', async () => {
        const petStatus = await PetStatus.findOneAsync({ name: devPetStatuses[2].name });
        const response = await request(app)
            .delete(`/api/pet/status/${petStatus._id}`);

        expect(response.body.success).toBe(true);
    });
});