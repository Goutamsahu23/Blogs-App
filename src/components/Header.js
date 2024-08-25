// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { FaBold, FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { MdPostAdd } from 'react-icons/md';
import { setSearchTerm } from '../features/searchSlice';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout({navigate}));
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <nav className='header'>
      <div className='header_right'>
        <FaBold size={30} color='blue' />
      </div>

      <input
        type='text'
        placeholder='search...'
        onChange={handleSearchChange}
      />

      <div className='header_buttons'>
        {isAuthenticated ? (
          <>
            <Link to="/add-post"><MdPostAdd size={30} color='blue' /></Link>
            <div className="profile_icon" onClick={toggleDropdown}>
              <FaRegUserCircle size={30} color='blue' />
              {isDropdownOpen && (
                <div className="dropdown">
                  <FaRegUserCircle size={150} />
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className='auth_btn'>Login</Link>
            <Link to="/signup" className='auth_btn join'>Join Us</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
