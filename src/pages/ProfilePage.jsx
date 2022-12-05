import { useState, useContext, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
// ICONS
import { FiEdit } from 'react-icons/fi';

// COMPONENTS
import ListingItem from '../components/ListingItem';
import Navbar from '../components/Navbar';

function ProfilePage({ item }) {
  const { changeDetails, editDetail, editProfile } = useContext(ThemeContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  useEffect(() => {
    setUser(auth.currentUser);
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, [auth.currentUser.uid]);
  const { name, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // DELETE
  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
    }
  };

  // EDIT
  const onEdit = (listingId) => navigate(`/edit-list/${listingId}`);
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
        {!loading && listings?.length > 0 && (
          <div className='profilePage__lstng'>
            <h2 className='profilePage__lstng__hdng heading-secondary'>
              Your listings
            </h2>
            <ul className='profilePage__lstng__lst'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
