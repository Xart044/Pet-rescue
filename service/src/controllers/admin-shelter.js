const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Shelter = require('../models/shelter');

/**
 * Controller for shelter creation.
 * 
 * @param {*} req  in request body name, description, location, email, phone is required;
 * @param {*} res  sends request status, created shelter and message
 * @param {*} next function moves to next middleware
 */
const create = async (req, res, next) => {
    try {
        const data = req.body;
        const shelter = await new Shelter({ ...data }).saveAsync();
        const returnObj = {
            success: true,
            message: 'New shelter was succesfully created.',
            data: shelter
        };
        res.send(returnObj);        
    } catch (error) {
        const err = APIError(`Error while creating new shelter: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create };