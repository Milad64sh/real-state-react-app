import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
function ProfileComponent() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    console.log(auth.currentUser);
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
            <Link to={'/profile'} className='profile__group--text--link'>
              My <strong>RE</strong> profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
