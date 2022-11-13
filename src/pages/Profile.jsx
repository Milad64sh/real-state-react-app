import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
function Profile() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return (
    <div>
      profile user ? <h1>{user.displayName}</h1>;
    </div>
  );
}

export default Profile;
