const Joi = require('joi');

module.exports = {
    // POST /api/auth/register
    userRegister: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().alphanum().min(6).max(24).required(),
            phoneNo: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            role: Joi.string().required()
        }
    },
    // POST /api/auth/activate
    accountActivate: {
        body: {
            email: Joi.string().email().required(),
            verificationNumber: [Joi.string(), Joi.number()]
        }
    },
    // POST /api/auth/send-verification
    sendVerification: {
        body: {
            email: Joi.string().email().required()
        }
    },
    // POST /api/auth/signin
    signin: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().alphanum().min(6).max(24).required()
        }
    },
    // PUT /api/user/:id
    updateUser: {
        body: {
            email: Joi.string().email(),
            phoneNo: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            bio: Joi.string(),
            password: Joi.string().alphanum().min(6).max(24)
        }
    },
    // POST /api/shelter
    shelterCreate: {
        body: {
            volunteers: Joi.array(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            location: Joi.array().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required()
        }
    },
    // PUT /api/shelter/:id
    shelterUpdate: {
        body: {
            volunteers: Joi.array(),
            name: Joi.string(),
            description: Joi.string(),
            location: Joi.array(),
            email: Joi.string().email(),
            phone: Joi.string()
        }
    },
    // POST /api/shelter/:id/volunteers
    shelterAddVolunteers: {
        body: {
            volunteers: Joi.array().required()
        }
    },
    // POST /api/pet/type
    petTypeCreate: {
        body: {
            name: Joi.string().required()
        }
    },
    // PUT /api/pet/type/:id
    petTypeUpdate: {
        body: {
            name: Joi.string().required()
        }
    },
    // POST /api/pet/status
    petStatusCreate: {
        body: {
            name: Joi.string().required()
        }
    },
    // PUT /api/pet/status/:id
    petStatusUpdate: {
        body: {
            name: Joi.string().required()
        }
    }
};
