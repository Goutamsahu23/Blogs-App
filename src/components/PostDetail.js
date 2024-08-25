// src/components/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../services/api';
import { fetchComments, addNewComment, addNewReply } from '../features/comments/commentSlice';
import { IoMdSend } from 'react-icons/io';
import { MdReplyAll } from 'react-icons/md';
import EditPost from '../pages/editPostPage'; 
import { FaEdit } from 'react-icons/fa';
import Spinner from './Spinner';

function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState({ commentId: null, replyText: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [editingPost, setEditingPost] = useState(false); 
  const comments = useSelector((state) => state.comments.items);
  const user = useSelector((state) => state.auth.user); 

  useEffect(() => {
    async function getPost() {
      try {
        const data = await fetchPostById(id);
        setPost(data);
        dispatch(fetchComments(id)); 
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    getPost();
  }, [id, dispatch]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(addNewComment({ postId: id, content: comment }));
      setComment('');
    }
  };

  const handleReplyChange = (commentId, replyText) => {
    setReply({ commentId, replyText });
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (reply.replyText.trim()) {
      dispatch(addNewReply({ commentId, reply: { content: reply.replyText } }));
      setReply({ commentId: null, replyText: '' });
    }
  };

  const handleEditClick = () => {
    setEditingPost(true);
  };

  const handleModalClose = () => {
    setEditingPost(false);
  };

  if (!post) return <Spinner />;

  // Check if the logged-in user is the author of the post
  const isAuthor = user && user._id === post.author._id;

  return (
    <div className="post-detail-body">
      <div className="image-section">
        <img
          src="https://picsum.photos/1500/1101/"
          alt="Background"
          className="background-image"
        />
      </div>
      <div className='grid-background'></div>
      <div className="overlay">
        <div className="post-detail-container">
          <header className="post-detail-header">
            <div className='post-h'>
            <h1 className="post-title">{post.title}</h1>
            {isAuthor && (
              
                <FaEdit size={25} color='blue' onClick={handleEditClick}/>
              
            )}
            </div>
            
            {/* Show edit button only if the user is logged in and is the author of the post */}
            
            <div className='post-detail-meta'>
              <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
              <p>{post.author.name}</p>
            </div>
          </header>

          <div className="post-content post-detail-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="comment-section">
            <div className="comment-input">
              <span className="comment-icon">📝</span>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter Comment"
                className="comment-field"
              />
              <IoMdSend color='blue' size={30} onClick={handleCommentSubmit} />
            </div>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <p>{comment.content}</p>
                  <MdReplyAll color='blue' size={30} onClick={() => handleReplyChange(comment._id, '')} />
                  {reply.commentId === comment._id && (
                    <form onSubmit={(e) => handleReplySubmit(e, comment._id)} className="reply-form">
                      <input
                        type="text"
                        value={reply.replyText}
                        onChange={(e) => setReply({ ...reply, replyText: e.target.value })}
                        placeholder="Enter reply"
                        className="reply-field"
                      />
                      <button type="submit"><IoMdSend color='blue' size={30} /></button>
                    </form>
                  )}
                  {comment.replies && (
                    <div className="replies-list">
                      {comment.replies.map((reply) => (
                        <div key={reply._id} className="reply-item">
                          <p>{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing post */}
      {editingPost && (
        <EditPost
          isOpen={editingPost}
          onClose={handleModalClose}
          post={post}
          setPost={(updatedPost) => setPost(updatedPost)}
        />
      )}
    </div>
  );
}

export default PostDetail;
