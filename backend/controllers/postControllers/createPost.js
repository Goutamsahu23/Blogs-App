const Post = require('../../models/post');

exports.createPost = async (req, res) => {
    try {
      const { title, author, content } = req.body;
      const newPost = new Post({ title, author, content });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };