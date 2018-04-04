const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * PetSchema
 */
const PetSchema = new Schema({
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * PetSchema hook
 * 
 * Each time verification updated, it sets new updated value
 */
PetSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * PetModel
 */
const PetModel = mongoose.model('Pet', PetSchema);

module.exports = PetModel;