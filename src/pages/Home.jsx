import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import SignIn from '../components/SignIn';
function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = () => {};
  return (
    <div className='home'>
      <SignIn trigger={true}>
        <>
          <div className='signIn__form'>
            <form className='form'>
              <div className='form__group'>
                <div className='u-margin-bottom-small'>
                  <h3 className='heading-tertiary'>Sign in</h3>
                </div>
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
                <label htmlFor='email' className='form__group--label'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='form__group--input'
                  placeholder='Email'
                  id='email'
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className='form__group'>
                <label htmlFor='password' className='form__group--label'>
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='form__group--input'
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
              <div className='form__group--btn'>
                <button className='form__btn'>Sign in</button>
              </div>
            </form>
          </div>
        </>
      </SignIn>
      <Navbar />
      <Header />
    </div>
  );
}

export default Home;
