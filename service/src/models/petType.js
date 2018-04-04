const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * PetTypeSchema
 */
const PetTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * PetTypeSchema hook
 * 
 * Each time model updated, it sets new updated value
 */
PetTypeSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * PetTypeModel
 */
const PetTypeModel = mongoose.model('PetType', PetTypeSchema);

module.exports = PetTypeModel;