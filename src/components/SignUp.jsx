import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
// CSS
import '../styles/css/index.css';
// ICONS
import { AiOutlineClose } from 'react-icons/ai';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
// COMPONENTS
import OAuth from './OAuth';

function SignUp() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();
  //  // TOGGLING ITEMS
  const signInToggler = () => setOpenSignIn((prevState) => !prevState);
  const signUpToggler = () => setOpenSignUp((prevState) => !prevState);
  const passwordToggler = () => setShowPassword((prevState) => !prevState);
  const closeSignInAndUp = () => {
    setOpenSignUp(false);
  };
  // FORM INPUTS

  const { email, password, name } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const submitSignUp = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='signUp signUp--open'>
      <div className='signUp__form'>
        <form onSubmit={submitSignUp} className='signUp__form__form'>
          <div className='signUp__form__group'>
            <div className='u-margin-bottom-small'>
              <h3 className='heading-tertiary'>welcome</h3>
            </div>
          </div>
          <div className='signUp__form__group'>
            <label htmlFor='name' className='signUp__form__group--label'>
              Name
            </label>
            <input
              type='text'
              className='signUp__form__group--input'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChange}
            />
          </div>
          <div className='signUp__form__group'>
            <label htmlFor='email' className='signUp__form__group--label'>
              Email Address
            </label>
            <input
              type='email'
              className='signUp__form__group--input'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='signUp__form__group'>
            <label htmlFor='password' className='signUp__form__group--label'>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className='signUp__form__group--input'
              placeholder='password'
              id='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div
            className='signUp__form__group--showPasswordUp'
            onClick={passwordToggler}
          >
            {!showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </div>
          <div className='signUp__form__group--btn'>
            <button type='submit' className='form__btn'>
              Sign up
            </button>
          </div>
        </form>
        <div className='signUp__form__OAuth'>
          <OAuth />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
