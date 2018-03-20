const jwt = require('jwt-simple');
const { Strategy: JWTstrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

const UserModel = require('../src/models/user');
const config = require('./index');

/**
 * JWT authentication middleware
 * 
 * @param {object} passport 
 */
const strategy = (passport) => {
    const options = {
        secretOrKey: config.auth.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    };
    passport.use(new JWTstrategy(options, async (payload, next) => {
        try {
            const user = await User.findByIdAsync(payload.id);
            if (user) {
                return next(null, user);
            }
            next(null, false);       
        } catch (err) {
            next(err, false)
        }
    }));
};

module.exports = {
    strategy
};