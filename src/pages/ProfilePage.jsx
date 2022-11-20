import { useState, useContext, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import { FiEdit } from 'react-icons/fi';

import Navbar from '../components/Navbar';

function ProfilePage({ item }) {
  const { changeDetails, editDetail, editProfile } = useContext(ThemeContext);
  const [user, setUser] = useState({});
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  const { name, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const submitEditForm = async (e) => {
    e.preventDefault();
    editDetail();
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in fb
        await updateProfile(auth.currentUser, { displayName: name });
        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {}
  };
  return (
    <>
      <Navbar />
      <div className='profilePage'>
        <form onSubmit={submitEditForm} className='profilePage__form'>
          <div className='profilePage__form__heading'>
            <div className='heading-secondary'>
              <h2>Personal details</h2>
            </div>
            {changeDetails ? (
              <div
                id=''
                className='profilePage__form__heading--edit'
                onClick={() => editProfile(item)}
              >
                <p>X cancel</p>
              </div>
            ) : (
              <div
                className='profilePage__form__heading--edit'
                onClick={() => editProfile(item)}
              >
                <p>
                  <FiEdit />
                  &nbsp; Edit
                </p>
              </div>
            )}
          </div>
          <div>
            <div className='profilePage__form__group'>
              <div className='profilePage__form__group--label'>
                <h3>Name</h3>
              </div>
              {!changeDetails ? (
                <input
                  type='text'
                  id='name'
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                  className='profilePage__form__group--input'
                />
              ) : (
                <div
                  onSubmit={submitEditForm}
                  className='profilePage__form__editForm'
                >
                  <input
                    className='profilePage__form__editForm--input'
                    type='text'
                    id='name'
                    disabled={!changeDetails}
                    value={name}
                    onChange={onChange}
                  />
                </div>
              )}
            </div>
            <div className='profilePage__form__group'>
              <div className='profilePage__form__group--label'>
                <h3>Email</h3>
              </div>
              {!changeDetails ? (
                <input
                  type='email'
                  id='email'
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                  className='profilePage__form__group--input'
                />
              ) : (
                <div
                  onSubmit={submitEditForm}
                  className='profilePage__form__editForm'
                >
                  <input
                    className='profilePage__form__editForm--input'
                    type='email'
                    id='email'
                    disabled={!changeDetails}
                    value={email}
                    onChange={onChange}
                  />
                </div>
              )}
            </div>
          </div>
          {changeDetails ? (
            <button type='submit' className='profilePage__form__editForm--btn'>
              save
            </button>
          ) : (
            ''
          )}
        </form>
      </div>
    </>
  );
}

export default ProfilePage;
