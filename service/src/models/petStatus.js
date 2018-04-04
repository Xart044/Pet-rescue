const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * PetStatusSchema
 */
const PetStatusSchema = new Schema({
    name: { type: String, required: true, unique: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * PetStatusSchema hook
 * 
 * Each time model updated, it sets new updated value
 */
PetStatusSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * PetStatusModel
 */
const PetStatusModel = mongoose.model('PetStatus', PetStatusSchema);

module.exports = PetStatusModel;