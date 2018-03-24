const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const { jwtSign } = require('./../../config/passport');
const { generateVerificationNumber, sendVerificationSMS } = require('../helpers/verification');

const signin = async (req, res, next) => {
    try {
        const { email,  password } = req.body;
        const user = await User.findOneAsync({ email: req.body.email });
        if (!user) {
            const err = new APIError(`There is already user with this email: ${email}`, httpStatus["401"]);
            next(err);
        } else {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                const err = new APIError('Authorization failed. Password incorrect.', httpStatus["401"]);
                return next(err);
            } else {
                const verification = await UserVerification.findByIdAsync(user._doc.verification);
                const verified = verification.verified && !verification.verificationNumber;
                const token = jwtSign(user);
                const returnObj = {
                    success: true,
                    data: {
                        ...user._doc,
                        verified,
                        token
                    }
                };
                res.send(returnObj);
            }
        }
    } catch (error) {
        const err = new APIError(`Error during creating new user: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

const activateAccount = async (req, res, next) => {
    const { verificationNumber, email } = req.body;

    try {
        const user = await User.findOneAsync({ email });
        if (!user) {
            const err = new APIError(`There is no user with this email: ${email}`, httpStatus["404"]);
            next(err);
        } else {
            const verification = await UserVerification.findOneAsync({ userId: user._id });
            if (verification.verified) {
                const err = new APIError(`This account is already activated.`, httpStatus["401"]);
                next(err);
            } else {
                if (verification.verificationNumber !== verificationNumber) {
                    const err = new APIError(`Verification number is incorrect.`, httpStatus["401"]);
                    next(err);
                } else {
                    await verification.updateAsync({ verified: true, verificationNumber: null, updated: new Date() });
                    res.send({
                        status: true,
                        message: 'Account activated.'
                    });
                }
            }
        }
    } catch (e) {
        const err = new APIError(`Error during activating user account: ${e}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

const sendVerification = async (req, res, next) => {
    const { email } = req.body;
    const verificationNumber = generateVerificationNumber();

    try {
        const user = await User.findOneAsync({ email });
        if (!user) {
            const err = new APIError(`There is no user with this email: ${email}`, httpStatus["404"]);
            next(err);
        } else {
            const verification = await UserVerification.findOneAsync({ userId: user._id });
            if (verification.verified) {
                const err = new APIError(`This account is already activated.`, httpStatus["401"]);
                next(err);
            } else {
                await verification.updateAsync({ verificationNumber });
                sendVerificationSMS(user.phoneNo, verificationNumber);
                res.send({
                    status: true,
                    message: `Verification number sent to ${user.phoneNo}.`
                });
            }
        }
    } catch (e) {
        const err = new APIError(`Error during sending verification number: ${e}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { signin, activateAccount, sendVerification };