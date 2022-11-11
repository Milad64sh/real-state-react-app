import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
function Profile() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    console.log(auth.currentUser);
    setUser(auth.currentUser);
  }, []);
  return (
    <>
      <div className='profile'>
        <div className='profile__form'>
          <div className='profile__form__group'>
            <div className='u-margin-bottom-small'>
              <h3 className='heading-tertiary'>
                Hello <span>{user.displayName}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
