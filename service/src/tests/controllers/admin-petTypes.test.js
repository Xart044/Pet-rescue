const request = require('supertest');

const app = require('../../index');
const PetType = require('../../models/petType');
const devPetTypes = require('../../constants/devPetTypes');
const { beforeAllTests, afterAllTests } = require('../../helpers/database');

beforeAll(async () => {
    await beforeAllTests();
});

afterAll(async () => {
    await afterAllTests();
});

describe('Pet type controller test', () => {
    it('#Test create method; POST /api/pet/type; ', async () => {
        const PetTypeData = { name: 'new' };
        const response = await request(app)
            .post(`/api/pet/type`)
            .send(PetTypeData);

        expect(response.body.success).toBe(true);
    });
    
    it('#Test update method; PUT /api/pet/type/:id; ', async () => {
        const PetTypeData = { name: 'new' };
        const petType = await PetType.findOneAsync({ name: devPetTypes[0].name });
        const response = await request(app)
            .put(`/api/pet/type/${petType._id}`)
            .send(PetTypeData);

        expect(response.body.success).toBe(true);
    });

    it('#Test delete method; DELETE /api/pet/type/:id; ', async () => {
        const petType = await PetType.findOneAsync({ name: devPetTypes[2].name });
        const response = await request(app)
            .delete(`/api/pet/type/${petType._id}`);

        expect(response.body.success).toBe(true);
    });
});