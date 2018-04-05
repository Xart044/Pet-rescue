const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require('../models/user');

/**
 * Controller for user updating.
 * 
 * @param {*} req  in request query id and request body update data is required;
 * @param {*} res  sends request status, updated user and message
 * @param {*} next function moves to next middleware
 */
const update = async (req, res, next) => {
    const { id } = req.query;
    const { data } = req.body;
    try {
        const user = await User.findByIdAndUpdateAsync(id, { $set: { ...data } }, { new: true });
        const returnObj = {
            success: true,
            message: 'User was succesfully updated.',
            data: user
        };
        res.send(returnObj);
    } catch (error) {
        const err = APIError(`Error during updating user[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

/**
 * Controller for user deleting.
 * 
 * @param {*} req  in request query id is required;
 * @param {*} res  sends request status, deleted type id and message
 * @param {*} next function moves to next middleware
 */
const deleteUser = async (req, res, next) => {
    const { id } = req.query;
    try {
        await User.findByIdAndRemoveAsync(id);
        const returnObj = {
            success: true,
            message: 'User was succesfully deleted.',
            data: { id }
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during deleting user[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { update, delete: deleteUser };