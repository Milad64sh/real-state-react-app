import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/index.css';
// ICONS
import { AiOutlineClose } from 'react-icons/ai';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
// COMPONENTS

function SignIn() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  //  // TOGGLING ITEMS
  const signInToggler = () => setOpenSignIn((prevState) => !prevState);
  const signUpToggler = () => setOpenSignUp((prevState) => !prevState);
  const passwordToggler = () => setShowPassword((prevState) => !prevState);
  // FORM INPUTS
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const submitSignIn = (e) => {
    e.preventDefault();
  };
  return (
    <div className='signIn signIn--open'>
      <div
        className={`signingToggler ${
          openSignUp && openSignIn ? `signingToggler--open` : {}
        }`}
      >
        <div className='signingToggler__logo'>re</div>
        <button className='signingToggler__signIn' onClick={signUpToggler}>
          <AiOutlineClose />
        </button>
      </div>

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
          <button
            className='signIn__form__group--showPassword'
            onClick={passwordToggler}
          >
            {!showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>
        <div className='signIn__form__group--btn'>
          <button type='submit' className='form__btn'>
            Sign in
          </button>
        </div>
        <div className='signIn__form__group'>
          <Link to={'/forgot-password'} className='signIn__form__group--link'>
            Forgotten your password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
