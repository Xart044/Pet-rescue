const roles = require('../constants/roles');

module.exports = [
    {
        email: 'abc@xyz.com',
        phoneNo: '+380974758219',
        firstName: 'test',
        lastName: 'admin',
        password: 'xhc044x123',
        role: roles.admin
    },
    {
        email: 'abc@xyz1.com',
        phoneNo: '+380974758219',
        firstName: 'test',
        lastName: 'user 1',
        password: 'xhc044x123',
        role: roles.default
    },
    {
        email: 'abc@xyz2.com',
        phoneNo: '+380974758219',
        firstName: 'test',
        lastName: 'user 2',
        password: 'xhc044x123',
        role: roles.default
    }
];