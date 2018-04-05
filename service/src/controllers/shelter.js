const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Shelter = require('../models/shelter');

/**
 * Controller for shelter update.
 * 
 * @param {*} req  in request request query id is required and all request body params are optional;
 * @param {*} res  sends request status, updated shelter and message
 * @param {*} next function moves to next middleware
 */
const update = async (req, res, next) => {
    const { id } = req.query;
    try {
        const data = req.body;
        const shelter = await Shelter.findByIdAndUpdateAsync(id, { $set: { ...data } }, { new: true });
        const returnObj = {
            success: true,
            message: 'Shelter was succesfully update.',
            data: shelter
        };
        res.send(returnObj);        
    } catch (error) {
        const err = APIError(`Error while updating shelter[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { update };