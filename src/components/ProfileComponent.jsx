import { useState, useEffect, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

function ProfileComponent() {
  const { changeSignInBtn } = useContext(ThemeContext);
  const [user, setUser] = useState({});
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return (
    <>
      <div className='profile'>
        <div className='profile__group'>
          <div className='profile__group--text'>
            <p>
              Hello <strong>{user.displayName}</strong>
            </p>
            <Link
              to={'/profile'}
              className='profile__group--text--link'
              onClick={changeSignInBtn}
            >
              My <strong>RE</strong> profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
