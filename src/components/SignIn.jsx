import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import '../styles/css/index.css';
// ICONS
import { AiOutlineClose } from 'react-icons/ai';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
// COMPONENTS

function SignIn() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [closeSignIn, setCloseSignIn] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  //  // TOGGLING ITEMS
  const signInToggler = () => setOpenSignIn((prevState) => !prevState);
  const signUpToggler = () => setOpenSignUp((prevState) => !prevState);
  const profileToggler = () => setOpenProfile((prevState) => !prevState);
  const passwordToggler = () => setShowPassword((prevState) => !prevState);
  const colapseSignIn = () => {
    setCloseSignIn(false);
    setOpenProfile(true);
  };
  // FORM INPUTS
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const submitSignIn = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='signIn signIn--open'>
      {openProfile ? (
        <div className='signIn__form'>
          <div className='signIn__form__group'>
            <div className='signIn__form__group--text'>
              <p>view</p>
              <button
                className='signIn__form__group--link'
                onClick={profileToggler}
              >
                my RE profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={submitSignIn} className='signIn__form'>
          <div className='signIn__form__group'>
            <div className='u-margin-bottom-small'>
              <h3 className='heading-tertiary'>Sign in</h3>
            </div>
          </div>
          <div className='signIn__form__group'>
            <label htmlFor='email' className='signIn__form__group--label'>
              Email Address
            </label>
            <input
              type='email'
              className='signIn__form__group--input'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='signIn__form__group'>
            <label htmlFor='password' className='signIn__form__group--label'>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className='signIn__form__group--input'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <div
              className='signIn__form__group--showPassword'
              onClick={passwordToggler}
            >
              {!showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
          </div>
          <div className='signIn__form__group--btn'>
            <button
              type='submit'
              className='form__btn'
              onClick={profileToggler}
            >
              Sign in
            </button>
          </div>
          <div className='signIn__form__group'>
            <Link to={'/forgot-password'} className='signIn__form__group--link'>
              Forgotten your password?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignIn;
