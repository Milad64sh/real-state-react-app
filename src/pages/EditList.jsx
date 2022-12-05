import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { v4 as uuidv4 } from 'uuid';
// COMPONENTS
import Spinner from '../components/Spinner';
// ICONS
import { BsArrowBarLeft } from 'react-icons/bs';

function EditList() {
  // eslint-disable-next-line
  const [geoLocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);

  // FETCH LISTING TO EDIT

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data(), address: docSnap.data().location });
        setLoading(false);
      } else {
        navigate('/');
      }
    };
    fetchListing();
  }, [params.listingId, navigate]);

  // SET USER REF TO LOGGED IN USER

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/');
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let geolocation = {};
    let location;
    if (geoLocationEnabled) {
      // billing account for google cloud should be created
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      // eslint-disable-next-line
      location = address;
    }
    // STORE IMAGES IN FIREBASE
    const StoreImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const imgUrls = await Promise.all(
      [...images].map((image) => StoreImage(image))
    ).catch(() => {
      setLoading(false);
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;
    delete formDataCopy.address;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    // update listing
    const docRef = doc(db, 'listings', params.listingId);
    await updateDoc(docRef, formDataCopy);
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };
  const onMutate = (e) => {
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='createList'>
      <div className='createList__bdy'>
        <header>
          <h2 className='createList__bdy__hdng heading-secondary'>
            Edit listing
          </h2>
        </header>
        <form onSubmit={onSubmit} className='createList__bdy__frm'>
          <label className='createList__bdy__frm--lbl'> Sell / Rent</label>
          <div className='createList__bdy__frm__btns'>
            <button
              type='button'
              className={
                type === 'sale'
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              id='type'
              value='sale'
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type='button'
              className={
                type === 'rent'
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              id='type'
              value='rent'
              onClick={onMutate}
            >
              Rent
            </button>
          </div>
          <label className='createList__bdy__frm--lbl'>Name</label>
          <input
            className='createList__bdy__frm--ipt'
            placeholder='Name'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          <div className='createList__bdy__frm__rms'>
            <div>
              <label className='createList__bdy__frm--lbl'>Bedrooms</label>
              <input
                className='createList__bdy__frm--ipt'
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                max='50'
                min='1'
                required
              />
            </div>
            <div>
              <label className='createList__bdy__frm--lbl'>Bathrooms</label>
              <input
                className='createList__bdy__frm--ipt'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                max='50'
                min='1'
                required
              />
            </div>
          </div>
          <label className='createList__bdy__frm--lbl'>Parking spot</label>
          <div className='createList__bdy__frm__btns'>
            <button
              className={
                parking
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
              min='1'
              max='50'
            >
              No
            </button>
          </div>
          <label className='createList__bdy__frm--lbl'>Furnished</label>
          <div className='createList__bdy__frm__btns'>
            <button
              className={
                furnished
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className='createList__bdy__frm--lbl'>Address</label>
          <textarea
            className='createList__bdy__frm--txtar'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />
          <label className='createList__bdy__frm--lbl'>Description</label>
          <textarea
            className='createList__bdy__frm--txtar'
            id='description'
            value={description}
            onChange={onMutate}
            required
          />
          <label className='createList__bdy__frm--lbl'>Offer</label>
          <div className='createList__bdy__frm__btns'>
            <button
              className={
                offer
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null
                  ? 'createList__bdy__frm__btns--btn active'
                  : 'createList__bdy__frm__btns--btn'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className='createList__bdy__frm--lbl'>Regular Price</label>
          <div className='createList__bdy__frm__prc'>
            <input
              className='createList__bdy__frm--ipt'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
            />
            {type === 'rent' && (
              <p className='createList__bdy__frm__prc--txt'>$ / Month</p>
            )}
          </div>
          {offer && (
            <>
              <label className='createList__bdy__frm--lbl'>
                Discounted Price
              </label>
              <input
                className='createList__bdy__frm--ipt'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
              />
            </>
          )}
          <label className='createList__bdy__frm--lbl'>Discounted Price</label>
          <p className='createList__bdy__frm__prc--txt'>
            The first image will be the cover (max 6).
          </p>
          <input
            type='file'
            className='createList__bdy__frm--ipt'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='createList__bdy__frm--sbbtn'>
            submit
          </button>
        </form>
        <div className='createList__bdy__bch'>
          <Link className='createList__bdy__bch--link' to={'/'}>
            Back to Home
          </Link>
          <div className='createList__bdy__bch--icon'>
            <BsArrowBarLeft />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditList;
