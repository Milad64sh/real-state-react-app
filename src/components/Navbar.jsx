import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/index.css';
// ICONS
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import SignIn from './SignIn';
import SignUp from './SignUp';

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  // TOGGLING ITEMS
  const signInToggler = () => setOpenSignIn((prevState) => !prevState);
  const signUpToggler = () => setOpenSignUp((prevState) => !prevState);
  const closeSignInAndUp = () => {
    setOpenSignIn(false);
    setOpenSignUp(false);
  };
  const menuToggler = () => setOpenMenu((prevState) => !prevState);

  return (
    <>
      <div className='navigation'>
        {/* SIGN IN */}
        <div
          className={`signingToggler ${
            openSignIn || openSignUp ? `signingToggler--open` : {}
          }`}
        >
          <div className='signingToggler__logo'>re</div>
          <button className='signingToggler__signIn' onClick={closeSignInAndUp}>
            <AiOutlineClose />
          </button>
          <div className='signingToggler__group'>
            {openSignIn && !openSignUp ? (
              <div className='signingToggler__group--text'>
                <p>New Member?</p>
                <button
                  className='signingToggler__group--link'
                  onClick={signUpToggler}
                >
                  Create Account Here
                </button>
              </div>
            ) : (
              ''
            )}
            {openSignUp && (
              <div className='signingToggler__group--text'>
                <p>Already have an account?</p>
                <button
                  className='signingToggler__group--link'
                  onClick={signUpToggler}
                >
                  Back to sign in
                </button>
              </div>
            )}
          </div>
        </div>
        {openSignIn && !openSignUp && <SignIn />}
        {openSignUp && <SignUp />}
        {/* NAVBAR */}
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
    </>
  );
}

export default Navbar;
