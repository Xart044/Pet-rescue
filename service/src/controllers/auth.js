const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const { jwtSign } = require('./../../config/passport');

const signin = async (req, res, next) => {
    try {
        const { email,  password } = req.body;
        const user = await User.findOneAsync({ email: req.body.email });
        if (!user) {
            const err = new APIError(`There is already user with this email: ${email}`);
            next(err);
        } else {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                const err = new APIError('Authorization failed. Password incorrect.', httpStatus["401"])
                return next(err);
            } else {
                const verification = await UserVerification.findByIdAsync(user._doc.verification);
                if (verification.verified && !verification.verificationNumber) {
                    const token = jwtSign(user);
                    const returnObj = {
                        success: true,
                        data: {
                            ...user._doc,
                            token
                        }
                    };
                    res.send(returnObj);
                } else {
                    const err = new APIError('Authorization failed. You should activate your account first.', httpStatus["401"])
                    return next(err);
                }
            }
        }
    } catch (error) {
        const err = new APIError(`Error during creating new user: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { signin };