import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  return (
    <>
      <div className='profilePage'>
        <Navbar />
      </div>
    </>
  );
}

export default ProfilePage;
