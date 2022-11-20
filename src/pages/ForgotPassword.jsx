import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <div className='forgotPassContainer'>
      <div className='forgotPassContainer__form'>
        <div className='forgotPassContainer__form__header'>
          <div className='forgotPassContainer__form__header--fplogo'>
            <div className='fplogo__lg'>
              <span className='logo__lg__initial'>r</span>eal.
              <span className='logo__lg__initial'> e</span>state
            </div>
          </div>
        </div>
        <div className='forgotPassContainer__form__formGroup'>
          <div className='forgotPassContainer__form__formGroup--text'>
            <h2>Forgot your password?</h2>
            <p>
              To reset your password, enter the email address used to create
              your account. We'll send you instructions on how to create a new
              password.
            </p>
            <p
              className={
                success
                  ? 'forgotPassContainer__form__formGroup--success show'
                  : 'forgotPassContainer__form__formGroup--success'
              }
            >
              &nbsp; Email was sent
            </p>
            <p
              className={
                error
                  ? 'forgotPassContainer__form__formGroup--error show'
                  : 'forgotPassContainer__form__formGroup--error'
              }
            >
              &nbsp; Could not send reset email
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              className='forgotPassContainer__form__formGroup--input'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Email Address'
            />
            <button className='forgotPassContainer__form__formGroup--btn'>
              Request new password
            </button>
          </form>
          <div className='forgotPassContainer__form__formGroup--link'>
            <Link
              to={'/'}
              className='forgotPassContainer__form__formGroup--link'
            >
              Back to Home &larr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
