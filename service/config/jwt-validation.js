const passport = require('passport');
const config = require('./index');
const httpStatus = require('http-status');
const APIError = require('../src/helpers/APIError');
const defaultRoles = require('../src/constants/roles');

/**
 * Middleware that checks JWT and access by user role
 * @param roles {Array}
 * @returns {function(*=, *=, *=)}
 */
const createJwtValidation = (roles) => {
    return (req, res, next) => {
        passport.authenticate('jwt', config.passportOptions, (error, user, info) => {
            if (user && roles.includes(user.role) && !error) {
                req.user = user;
                return next();
            } else {
                if (error) {
                    const err = new APIError('Token not matched', httpStatus.UNAUTHORIZED);
                    return next(err);
                }
                const err = new APIError(`Token not matched and error msg ${info}`, httpStatus.UNAUTHORIZED);
                return next(err);
            }
        })(req, res, next);
    };
};

export default {
    validateAdmin: createJwtValidation([defaultRoles.admin]),
    validateUser: createJwtValidation([defaultRoles.admin, defaultRoles.volunteer, defaultRoles.shelter]),
    validateShelter: createJwtValidation([defaultRoles.admin, defaultRoles.shelter])
};
