const httpStatus = require('http-status');
const APIError = require('./../helpers/APIError');
const User = require('./../models/user');

const create = async (req, res, next) => {
    try {
        const { email, phoneNo, firstName, lastName, password } = req.body;
        const foundUser = await User.findOneAsync({ email: req.body.email });
        if (foundUser) {
            const err = new APIError(`There is already user with this email: ${email}`);
            next(err);
        } else {
            const newUser = await new User({ email, phoneNo, firstName, lastName, password }).saveAsync();
            const returnObj = {
                success: true,
                message: 'User was successfully created.'
            };
            res.send(returnObj);
        }
    } catch (error) {
        const err = new APIError(`Error during creating new user: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create };