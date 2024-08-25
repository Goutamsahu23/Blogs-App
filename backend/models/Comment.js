const mongoose = require('mongoose');
const Reply = require('./ReplyComment');

const CommentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    replies: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reply' 
    }], // Reference to replies
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Comment', CommentSchema);
