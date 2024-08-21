const express = require('express');
const router = express.Router();

const {getAllPosts} = require('../controllers/postControllers/getAllPost')
const {getPostById} = require('../controllers/postControllers/getPostById')
const {createPost} = require('../controllers/postControllers/createPost')
const {updatePost} = require('../controllers/postControllers/updatePost')
const {deletePost} = require('../controllers/postControllers/deletePostById');
const { verifyUser } = require('../middleware/authMiddleware');

router.get('/', getAllPosts); //working
router.get('/:id', getPostById); //working
router.post('/', createPost); //working
router.put('/:id', updatePost); //working
router.delete('/:id', deletePost); //working

module.exports = router;
