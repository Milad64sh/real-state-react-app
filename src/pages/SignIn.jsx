import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/css/index.css';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = () => {};
  return (
    <>
      <div className='signIn'>
        <div className='signIn__form'>
          <form className='form'>
            <div className='u-margin-bottom-small'>
              <h3 className='heading-tertiary'>Sign in</h3>
            </div>
            <div className='form__group'>
              <p className='form__group--text'>
                New Member?
                <span className='form__group--link'>
                  <Link to={'/sign-up'}>Create Account here</Link>
                </span>
              </p>
            </div>
            <div className='form__group'>
              <label htmlFor='email' className='form__label'>
                Email Address
              </label>
              <input
                type='email'
                className='form__input'
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='password' className='form__label'>
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className='form__input'
                placeholder='password'
                id='password'
                value={password}
                onChange={onChange}
              />
            </div>
            <div className='form__group'>
              <Link to={'/forgot-password'} className='link'>
                Forgotten your password?
              </Link>
            </div>
            <button className='form__btn'>Sign in</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
