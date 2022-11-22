import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// SASS
import '../styles/css/index.css';
// ICONS
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import ProfileComponent from './ProfileComponent';
// COMPONENTS
import OAuth from './OAuth';

function SignIn(props) {
  const [openError, setOpenError] = useState(false);
  const [closeSignIn, setCloseSignIn] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  //  // TOGGLING ITEMS
  const setProfile = (s) => {
    props.setProfile(s);
  };
  const profileToggler = () => setOpenProfile((prevState) => !prevState);
  const passwordToggler = () => setShowPassword((prevState) => !prevState);
  const colapseSignIn = () => {
    setProfile();
    setCloseSignIn(false);
  };
  // FORM INPUTS
  const { email, password } = formData;
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
        colapseSignIn();
        profileToggler();
      }
    } catch (error) {
      setOpenError(true);
    }
  };
  return (
    <>
      <div className='signIn signIn--open'>
        {openProfile ? (
          <div className='signIn__form'>
            <ProfileComponent />
          </div>
        ) : (
          <div className='signIn__form'>
            <form onSubmit={submitSignIn} className='signIn__form__form'>
              <div
                className={`signIn__form__erContainer ${
                  openError ? `signIn__form__erContainer--open` : {}
                }`}
              >
                <p className='signIn__form__erContainer--erText'>
                  We cannot find an account with the email address and/or
                  password that you have used.
                </p>
              </div>
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
                <label
                  htmlFor='password'
                  className='signIn__form__group--label'
                >
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
                  onClick={colapseSignIn}
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className='signIn__form__OAuth'>
              <OAuth />
            </div>
            <div className='signIn__form__group'>
              <Link
                to={'/forgot-password'}
                className='signIn__form__group--link'
              >
                Forgotten your password?
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignIn;
