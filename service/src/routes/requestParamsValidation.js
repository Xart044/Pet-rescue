const Joi = require('joi');

module.exports = {
    // POST /api/auth/register
    createUser: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().alphanum().min(6).max(24).required(),
            phoneNo: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
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
    }
};
