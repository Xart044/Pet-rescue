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
        query: {
            id: Joi.string().required()
        },
        body: {
            object: Joi.object().required()
        }
    },
    // DELETE /api/user/:id
    deleteUser: {
        query: {
            id: Joi.string().required()
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
        query: {
            id: Joi.string().required()
        },
        body: {
            name: Joi.string().required()
        }
    },
    // DELETE /api/pet/type/:id
    petTypeDelete: {
        query: {
            id: Joi.string().required()
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
        query: {
            id: Joi.string().required()
        },
        body: {
            name: Joi.string().required()
        }
    },
    // DELETE /api/pet/status/:id
    petStatusDelete: {
        query: {
            id: Joi.string().required()
        }
    }
};
