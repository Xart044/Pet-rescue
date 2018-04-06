const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Shelter = require('../models/shelter');

/**
 * Controller for shelter creation.
 * 
 * @param {*} req  in request body name, description, location, email, phone are required;
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
        const err = new APIError(`Error while creating new shelter: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

/**
 * Controller for shelter delete.
 * 
 * @param {*} req  in request request query id is required;
 * @param {*} res  sends request status, deleted shelter and message
 * @param {*} next function moves to next middleware
 */
const deleteShelter = async (req, res, next) => {
    const { id } = req.query;
    try {
        const shelter = await Shelter.findByIdAndUpdateAsync(id, { $set: { archive: true } }, { new: true });
        const returnObj = {
            success: true,
            message: 'Shelter was succesfully deleted.',
            data: shelter
        };
        res.send(returnObj);        
    } catch (error) {
        const err = new APIError(`Error while deleting shelter[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create, delete: deleteShelter };