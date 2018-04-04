const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * PetSchema
 */
const PetSchema = new Schema({
    typeId: { type: Schema.Types.ObjectId, ref: 'PetType', required: true },
    statusId: { type: Schema.Types.ObjectId, ref: 'PetStatus', required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * PetSchema hook
 * 
 * Each time model updated, it sets new updated value
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