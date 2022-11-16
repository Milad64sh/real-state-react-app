import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

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
          <div className='profilePage__form__group'>
            <div className='profilePage__form__group--label'>
              <div className='profilePage__form__group--label--title'>
                <h3>Name</h3>
              </div>
              <div className='profilePage__form__group--label--edit'>
                <p>
                  <FiEdit />
                  &nbsp; Edit
                </p>
              </div>
            </div>
            <div className='profilePage__form__group--input'>
              <p>name</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
