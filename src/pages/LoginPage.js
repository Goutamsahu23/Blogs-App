import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const validateForm = () => {
    let formErrors = {};
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
    return formErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    

    try {
      await dispatch(loginUser({ email, password })).unwrap(); // Use unwrap() to handle errors
      toast.success('Logged in successfully!'); 
    } catch (error) {
      toast.error('Failed to log in. Please check your credentials.'); 
    }
  };
console.log(isAuthenticated)
  // Redirect if authenticated
  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div className='login_container'>
      <div className='login_right'></div>
      <div className='login_left'>
        <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
        <h1>Log In</h1>
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

        <form onSubmit={handleLogin}>
          <label>
            Username or Email Address
            <input
              type='text'
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

          <a href='/forgot-password'>Forgot password?</a>

          <button className='btn login_btn' type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
        </form>

        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
