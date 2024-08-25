// src/pages/HomePage.js
import React from 'react';
import PostList from '../components/PostList';

function HomePage() {
  return (
    <div className='home-page '>
      <div className='grid-background'></div>
      <div className='content'>
        <PostList />
      </div>
    </div>
  );
}

export default HomePage;
