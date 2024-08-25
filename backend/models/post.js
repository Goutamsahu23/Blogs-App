const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }], // Reference to comments
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Post', PostSchema);
