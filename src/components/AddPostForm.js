import React from 'react';
import { Formik, Form, Field } from 'formik';
import { createPost } from '../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchAllPosts } from '../features/posts/postSlice';
import { useDispatch } from 'react-redux';

function AddPostForm() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ title: '', content: '' }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await createPost(values);
          toast.success("post created successfully")
          resetForm();
          navigate('/')
          dispatch(fetchAllPosts()); 
        } catch (error) {
          toast.error( error.response.data.message);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="add-post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter post title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <ReactQuill
              value={values.content}
              onChange={(value) => setFieldValue('content', value)}
              modules={quillModules}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Add Post</button>
            <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>Cancel</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const quillModules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ 'align': [] }],
    ['clean']        
  ],
};

export default AddPostForm;
