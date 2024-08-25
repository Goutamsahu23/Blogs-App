const Post = require('../../models/post');
const User = require('../../models/User');

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = new Post({
            title,
            content,
            author: req.user._id,
        });

        const savedPost = await newPost.save();

        // Add the post to the user's posts array
        const user = await User.findById(req.user._id);
        user.posts.push(savedPost._id);
        await user.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
