const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * PostSchema
 */
const PostSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    animals: { type: [{ type: Schema.Types.ObjectId, ref: 'Pet', required: true }], required: true },
    description: { type: String, required: true },
    location: { type: [Number], index: '2d', required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * PostSchema hook
 * 
 * Each time model updated, it sets new updated value
 */
PostSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * PostModel
 */
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;