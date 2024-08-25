import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, deletePostById } from '../features/posts/postSlice';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { FaRegComments, FaUserCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner'

function PostList() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const searchTerm = useSelector((state) => state.search.term);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePost = (postId) => {
    dispatch(deletePostById(postId))
      .unwrap()
      .then(() => {
        toast.success("post deleted")
        dispatch(fetchAllPosts());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="post-list-container">
      {status === 'loading' && <Spinner />}
      {status === 'succeeded' && (
        <ul className="post-list">
          {filteredPosts.map((post) => (
            <li key={post._id} className="post-list-item">
              <div className="post-icon">
                <span>{post.title.charAt(0).toUpperCase()}</span>
              </div>
              <div className="post-list-content">
                <Link to={`/post/${post._id}`} className="post-title">
                  {post.title}
                </Link>
                <div className="post-meta">
                  <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>&nbsp; By {post.author.name}</span>
                </div>
              </div>
              <div className="post-actions">
                <div className="comment-icon">
                  <FaRegComments size={25} />
                  <span className="comment-count">{post.comments.length}</span>
                </div>
                {user && user._id === post.author._id && (
                  <button className="action-button view" onClick={() => handleDeletePost(post._id)}>
                    <MdDeleteForever size={25} />
                  </button>
                )}
                <div className="author-wrapper">
                  <button className="action-button author"><FaUserCircle size={25} /></button>
                  <div className="author-name">{post.author.name}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Error loading posts</p>}
    </div>
  );
}

export default PostList;
