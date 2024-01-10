const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAT: {
        type: Date,
        default: Date.now
    },
    updatedAT: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);