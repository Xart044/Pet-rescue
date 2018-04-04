const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const PetStatus = require('../models/petStatus');

/**
 * Controller for pet status creation.
 * 
 * @param {*} req  in request body name is required;
 * @param {*} res  sends request status, created status and message
 * @param {*} next function moves to next middleware
 */
const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const status = await new PetStatus({ name }).saveAsync();
        const returnObj = {
            success: true,
            message: 'Pet status was succesfully created.',
            data: status
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during creating new user: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create };