const jwt = require('jwt-simple');
const { Strategy: JWTstrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

const User = require('../src/models/user');
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
            next(err, false);
        }
    }));
};

/**
 * jwtSign function for creating jwt token based on specific user data.
 * 
 * @param {object} user
 * 
 * @returns {string} token
 */
const jwtSign = (user) => {
    const token = jwt.encode(user._doc, config.auth.secret);
    return `${config.auth.tokenName} ${token}`;
};

module.exports = {
    jwtSign,
    strategy
};
