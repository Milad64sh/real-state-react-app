import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ProfileDetail from '../components/ProfileDetail';

function ProfilePage() {
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  return (
    <>
      <Navbar />
      <div className='profilePage'>
        <div className='profilePage__form'>
          <div className='profilePage__form__heading'>
            <div className='heading-secondary'>
              <h2>Personal details</h2>
            </div>
          </div>
          <ProfileDetail />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
