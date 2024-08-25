import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter } from 'react-icons/fa';
import { signup } from '../services/api'; 
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!name) {
      formErrors.name = 'Name is required';
    }
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    }
    if (!dob) {
      formErrors.dob = 'Date of birth is required';
    } else if (new Date(dob) > new Date()) {
      formErrors.dob = 'Date of birth cannot be in the future';
    }
    return formErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Example signup logic
    try {
      // Replace with actual API call
      const response = await signup(name, email, password, dob);
      if (response.success) {
        toast.success("user registered successfully")
        navigate('/login');
      } else {
        toast.error('Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className='login_container'>
      <div className='login_right'></div>
      <div className='login_left'>
        <p>Already have an account? <a href='/login'>Log In</a></p>
        <h1>Sign Up</h1>
        <button style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <FcGoogle size={30} /> Continue With Google
        </button>
        <button style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <FaTwitter size={30} /> Continue With Twitter
        </button>

        <div className='OR'>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        <form onSubmit={handleSignUp}>
          <label>
            Name
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className='error'>{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </label>

          <label>
            Password
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </label>

          <label>
            Date of Birth
            <input
              type='date'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && <span className='error'>{errors.dob}</span>}
          </label>

          <button className='btn login_btn' type='submit'>
            Sign Up
          </button>
          <p>Already have an account? <a href='/login'>Log In</a></p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
