const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * PostSchema
 */
const PostSchema = new Schema({
    prevPostId: { type: Schema.Types.ObjectId, ref: 'Post', default: null },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    location: { type: [Number], index: '2d', required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
});

/**
 * PostSchema hook
 * 
 * Each time verification updated, it sets new updated value
 */
PostModel.pre('save', function (next) {
    if (!this.isNew) {
        this.updated = new Date(); 
    }
    next();
});

/**
 * UserVerificationModel
 */
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;