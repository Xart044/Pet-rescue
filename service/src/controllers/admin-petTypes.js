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
    const { name } = req.body;
    try {
        const type = await new PetType({ name }).saveAsync();
        const returnObj = {
            success: true,
            message: 'Pet type was succesfully created.',
            data: type
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during creating new pet type : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

/**
 * Controller for pet type updating.
 * 
 * @param {*} req  in request body id and name is required;
 * @param {*} res  sends request status, updated type and message
 * @param {*} next function moves to next middleware
 */
const update = async (req, res, next) => {
    const { id, name } = req.body;
    try {
        const type = await PetType.findByIdAndUpdateAsync(id, { $set: { name } }, { new: true });
        const returnObj = {
            success: true,
            message: 'Pet type was succesfully updated.',
            data: type
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during updating pet type[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create, update };