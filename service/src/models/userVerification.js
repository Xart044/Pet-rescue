const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * UserVerificationSchema
 */
const UserVerificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    verified: { type: Boolean, default: false },
    verificationNumber: { type: String, default: null },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * UserVerificationScheme hook
 * 
 * Each time model updated, it sets new updated value
 */
UserVerificationSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * UserVerificationModel
 */
const UserVerificationModel = mongoose.model('UserVerification', UserVerificationSchema);

module.exports = UserVerificationModel;