import { useState, useContext } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import ThemeContext from '../context/ThemeContext';

function ProfileDetail({ item }) {
  const { editDetail, editProfile, changeDetails } = useContext(ThemeContext);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const submitEditForm = (e) => {
    editDetail();
    e.preventDefault();
  };
  return (
    <div>
      <div className='profilePage__form__group'>
        <div className='profilePage__form__group--label'>
          <div className='profilePage__form__group--label--title'>
            <h3>Name</h3>
          </div>
          {changeDetails ? (
            <div
              id=''
              className='profilePage__form__group--label--edit'
              onClick={() => editProfile(item)}
            >
              <p>x &nbsp; cancel</p>
            </div>
          ) : (
            <div
              className='profilePage__form__group--label--edit'
              onClick={() => editProfile(item)}
            >
              <p>
                <FiEdit />
                &nbsp; Edit
              </p>
            </div>
          )}
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
          <form onSubmit={submitEditForm} className='profilePage__editForm'>
            <input
              className='profilePage__editForm--input'
              type='text'
              id='name'
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <button type='submit' className='profilePage__editForm--btn'>
              save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileDetail;
