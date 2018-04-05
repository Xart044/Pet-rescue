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

/**
 * Controller for adding volunteers to shelter.
 * 
 * @param {*} req  in request request query id and request body volunteers are required;
 * @param {*} res  sends request status, updated shelter and message
 * @param {*} next function moves to next middleware
 */
const addVolunteers = async (req, res, next) => {
    const { id } = req.query;
    const { volunteers } = req.body;
    try {
        const shelter = await Shelter.findByIdAsync(id);
        const newVolunteers = shelter.volunteers.filter(volunteer => volunteers.indexOf(volunteer) > 0).concat(volunteers);
        const newShelter = await shelter.updateAsync({ $set: { volunteers: newVolunteers } });
        const returnObj = {
            success: true,
            message: `Volunteer${volunteers.length === 1 ? '' : 's'} ${volunteers.length === 1 ? 'was' : 'were'} added to shelter.`,
            data: newShelter
        };
        res.send(returnObj);        
    } catch (error) {
        const err = APIError(`Error while adding volunteer${volunteers.length === 1 ? '' : 's'} to shelter[${id}] : ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
        next(err);
    }
};

module.exports = { update, addVolunteers };