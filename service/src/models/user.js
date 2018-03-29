const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const roles = require('../constants/roles');

const { Schema } = mongoose;

/**
 * User Schema
 */
const UserSchema = new Schema({
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    verification: { type: Schema.Types.ObjectId, ref: 'UserVerification' },
    role: { type: String, default: roles.default },
    loginStatus: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null }
});

/**
 * UserScheme hook
 * 
 * Each time after saving or updating user model, checks for need to hash password.
 * Password hashes, if password changes or user is new.
 */
UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            if (!this.isNew) {
                this.updated = new Date();
            }
            next();
        } catch (err) {
            next(err);
        }     
    } else {
        this.updated = new Date();
        next();
    }
});

/**
 * UserScheme method
 *
 * Uses for comparing password and password hash
 */
UserSchema.methods.comparePassword = async function (pw) {
    const isMatch = await bcrypt.compare(pw, this.password);
    return isMatch;
};
  
/**
 * UserModel
 */
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;