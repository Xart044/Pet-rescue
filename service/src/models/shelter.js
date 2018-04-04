const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * ShelterSchema
 */
const ShelterSchema = new Schema({
    volunteers: { type: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }], required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: [Number], index: '2d', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * UserVerificationScheme hook
 * 
 * Each time verification updated, it sets new updated value
 */
ShelterSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * ShelterModel
 */
const ShelterModel = mongoose.model('Shelter', ShelterSchema);

module.exports = ShelterModel;