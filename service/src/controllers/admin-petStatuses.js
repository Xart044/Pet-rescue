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
    const { name } = req.body;
    try {
        const status = await new PetStatus({ name }).saveAsync();
        const returnObj = {
            success: true,
            message: 'Pet status was succesfully created.',
            data: status
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during creating new pet status: ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

/**
 * Controller for pet status updating.
 * 
 * @param {*} req  in request body id and name is required;
 * @param {*} res  sends request status, updated status and message
 * @param {*} next function moves to next middleware
 */
const update = async (req, res, next) => {
    const { id } = req.query;
    const { name } = req.body;
    try {
        const status = await PetStatus.findByIdAndUpdateAsync(id, { $set: { name } }, { new: true });
        const returnObj = {
            success: true,
            message: 'Pet status was succesfully updated.',
            data: status
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during updating pet status[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

/**
 * Controller for pet status deleting.
 * 
 * @param {*} req  in request body id is required;
 * @param {*} res  sends request status, deleted status id and message
 * @param {*} next function moves to next middleware
 */
const deletePetStatus = async (req, res, next) => {
    const { id } = req.query;
    try {
        await PetStatus.findByIdAndRemoveAsync(id);
        const returnObj = {
            success: true,
            message: 'Pet status was succesfully deleted.',
            data: { id }
        };
        res.send(returnObj);
    } catch (error) {
        const err = new APIError(`Error during deleting pet status[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { create, update, delete: deletePetStatus };