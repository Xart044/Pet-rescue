const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const { jwtSign } = require('./../../config/passport');
const { generateVerificationNumber, sendVerificationSMS } = require('../helpers/verification');

/**
 * Controller for user signin.
 * 
 * @param {*} req  in request body email and password is required;
 * @param {*} res  sends request status and user data
 * @param {*} next function moves to next middleware
 */
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
                await user.updateAsync({ loginStatus: true, lastLogin: new Date(), updated: new Date() });
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

/**
 * Controller for activating user account.
 * 
 * @param {*} req  in request body email and verificationNumber is required;
 * @param {*} res  sends request status and message
 * @param {*} next function moves to next middleware
 */
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
                        success: true,
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

/**
 * Controller for sending verification number on user phoneNumber.
 * 
 * @param {*} req  in request body email is required;
 * @param {*} res  sends request status and message
 * @param {*} next function moves to next middleware
 */
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
                    success: true,
                    message: `Verification number sent to ${user.phoneNo}.`
                });
            }
        }
    } catch (e) {
        const err = new APIError(`Error during sending verification number: ${e}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};


/**
 * Controller for user register.
 * Creates user and sends verificationNumber on users phone.
 * 
 * @param {*} req  in request body email and password is required;
 * @param {*} res  sends request status and message
 * @param {*} next function moves to next middleware
 */
const register = async (req, res, next) => {
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

module.exports = { signin, register, activateAccount, sendVerification };