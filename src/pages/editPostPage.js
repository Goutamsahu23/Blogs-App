// src/pages/editPostPage.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import { updatePost } from '../services/api';
 // Import your CSS file for styling

const EditPost = ({ isOpen, onClose, post, setPost }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    if (isOpen) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [isOpen, post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await updatePost(post._id, { title, content });
      setPost(updatedPost);
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <button className="close-button" onClick={onClose}>×</button>
      <h2 className="modal-title">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image']
              ],
            }}
            className="quill-editor"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPost;
