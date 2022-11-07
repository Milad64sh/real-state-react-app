import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/css/index.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

import { Link } from 'react-router-dom';
function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = () => {};
  const signInToggler = () => setOpenSignIn((p) => !p);
  const menuToggler = () => setOpenMenu((p) => !p);
  return (
    <>
      <div className='navigation'>
        <div className='navigation__content'>
          <div className='logo'>
            <div className='logo__lg'>
              <span className='logo__lg__initial'>r</span>eal.
              <span className='logo__lg__initial'> e</span>state
            </div>
            <div className='logo__sm'>
              <span className='logo__sm__initial'>re</span>
            </div>
          </div>

          <div>
            <nav
              className={`nav ${openMenu && !openSignIn ? `nav--open` : {}}`}
            >
              <Link className='nav__item' to={'/buy'}>
                Buy
              </Link>
              <Link className='nav__item' to={'/rent'}>
                Rent
              </Link>
              <Link className='nav__item' to={'/about-us'}>
                About Us
              </Link>
              <Link className='nav__item' to={'/contact us'}>
                Contact Us
              </Link>
              <div className='nav__button__container'>
                <button className='btn' onClick={signInToggler}>
                  Sign In
                </button>
              </div>
            </nav>
          </div>
          <div>
            <div className='navigation__button__container'>
              <button className='btn' onClick={signInToggler}>
                Sign In
              </button>
            </div>
            <button className='navigation__toggler' onClick={menuToggler}>
              {!openMenu ? <AiOutlineMenu /> : <AiOutlineClose />}
            </button>
          </div>
        </div>
      </div>
      <div className={`signIn ${openSignIn ? `signIn--open` : {}}`}>
        <form className='signIn__form'>
          <button className='signIn__toggler' onClick={signInToggler}>
            <AiOutlineClose />
          </button>
          <div className='signIn__form__group'>
            <div className='u-margin-bottom-small'>
              <h3 className='heading-tertiary'>Sign in</h3>
            </div>
          </div>
          <div className='signIn__form__group'>
            <div className='signIn__form__group--text'>
              <p>New Member?</p>
              <Link to={'/sign-up'} className='signIn__form__group--link'>
                Create Account Here
              </Link>
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
              placeholder='password'
              id='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='signIn__form__group'>
            <Link to={'/forgot-password'} className='signIn__form__group--link'>
              Forgotten your password?
            </Link>
          </div>
          <div className='signIn__form__group--btn'>
            <button className='form__btn'>Sign in</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Navbar;
