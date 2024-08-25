// src/services/api.js
import axios from 'axios';

// Base URL for the API
const API_URL = process.env.REACT_APP_API_URL || 'https://blogs-app-1-zxap.onrender.com';
console.log(API_URL)

// Helper function to get token from local storage
const getToken = () => localStorage.getItem('token'); 

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

// Create a new post
export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, post, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Update a post
export const updatePost = async (id, post) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Add a comment
export const addComment = async ({ postId, content }) => {
  try {
    const response = await axios.post(`${API_URL}/comments/${postId}`, { content }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Get comments by post ID
export const getCommentByPost = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${postId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Reply to a comment
export const addReply = async ({commentId, reply}) => {
  try {
    console.log(reply)
    const response = await axios.post(`${API_URL}/comments/${commentId}/reply`, reply, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error adding reply to comment with id ${commentId}:`, error);
    throw error;
  }
};


  // login and signup
  export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save the token in local storage
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  export const signup=async(name,email,password,date_of_birth)=>{
    try{
      const response=await axios.post(`${API_URL}/auth/register`,{name,email,password,date_of_birth})
      console.log(response)
      return response.data
    }catch(error){
      console.error(`Error while login`, error);
      throw error;
    }
  }

  export const getProfileDetails=async()=>{
    try{
      const response=await axios.get(`${API_URL}/auth/profile`,{
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      console.log(response)
      return response.data
    }catch(error){
      console.error(`Error while fetching profile`, error);
      throw error;
    }
  }