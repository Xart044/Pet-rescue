const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const PetType = require('../models/petType');

/**
 * Controller for pet type creation.
 * 
 * @param {*} req  in request body name is required;
 * @param {*} res  sends request status, created type and message
 * @param {*} next function moves to next middleware
 */
const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const type = await PetType.saveAsync({ name });
        const returnObj = {
            success: true,
            message: 'Type was succesfully created.',
            type
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during creating new user: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create };