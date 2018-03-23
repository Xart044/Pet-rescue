const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * VerificationSchema
 */
const UserVerificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    verified: { type: Boolean, default: false },
    verificationNumber: { type: String, default: null },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * VerificationModel
 */
const UserVerificationModel = mongoose.model('UserVerification', UserVerificationSchema);

module.exports = UserVerificationModel;