// routes/comments.js
const express = require('express');
const { addComment } = require('../controllers/commentControllers/addComment');
const { getCommentsByPost } = require('../controllers/commentControllers/getCommentByPost');
const { replyComment } = require('../controllers/commentControllers/replyComment');
const { verifyUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:postId', verifyUser, addComment);
router.get('/:postId', getCommentsByPost);

router.post('/:commentId/reply', verifyUser, replyComment);

module.exports = router;
