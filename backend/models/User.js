    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Reference to posts
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    });

    module.exports = mongoose.model("User", userSchema);
