const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const { generateVerificationNumber, sendVerificationSMS } = require('../helpers/verification');

const create = async (req, res, next) => {
    try {
        const { email, phoneNo, firstName, lastName, password, role } = req.body;
        const foundUser = await User.findOneAsync({ email: req.body.email });
        if (foundUser) {
            const err = new APIError(`There is already user with this email: ${email}`);
            next(err);
        } else {
            let verification;
            const newUser = await new User({ email, phoneNo, firstName, lastName, password, role }).saveAsync();
            if (process.env.ENV === 'production') {
                const verificationNumber = generateVerificationNumber();
                verification = await new UserVerification({ userId: newUser._id, verificationNumber }).saveAsync();
                sendVerificationSMS(phoneNo, verificationNumber);
            } else {
                verification = await new UserVerification({ userId: newUser._id, verified: true }).saveAsync();
            }
            await newUser.updateAsync({verification: verification._id});
            const returnObj = {
                success: true,
                message: 'User was successfully created. Now activate your account.'
            };
            res.send(returnObj);
        }
    } catch (error) {
        const err = new APIError(`Error during creating new user: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create };