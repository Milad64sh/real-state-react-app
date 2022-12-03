import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { BsArrowBarLeft } from 'react-icons/bs';
// import { toast } from 'react-toastify';
function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      }
    };
    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className='contact'>
      <header>
        <h3 className='contact__hdng heading-tertiary'>Contact Landlord</h3>
      </header>
      {landlord !== null && (
        <main>
          <div className='contact__ldld'>
            <p className='contact__ldld__name'>{landlord?.name}</p>
            <form className='contact__ldld__frm'>
              <label className='contact__ldld__frm--lbl'>Message</label>
              <textarea
                name='message'
                id='message'
                className='contact__ldld__frm--txtar'
                value={message}
                onChange={onChange}
              ></textarea>
              <a
                href={`mailto:${landlord.email}?subject=${searchParams.get(
                  'listingName'
                )}&body=${message}`}
                className='contact__ldld__frm__a'
              >
                <button type='button' className='contact__ldld__frm__a--btn'>
                  Send Message
                </button>
              </a>
            </form>
            <div className='contact__ldld__bch'>
              <Link className='contact__ldld__bch--lnk' to={'/'}>
                Back to Home <BsArrowBarLeft />
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default Contact;
