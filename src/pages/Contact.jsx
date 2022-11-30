import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
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
        <h3 className='contact__heading heading-tertiary'>Contact Landlord</h3>
      </header>
      {landlord !== null && (
        <main>
          <div className='contact__ldld'>
            <p className='contact__ldld__name'>{landlord?.name}</p>
          </div>
          <form className='contact__frm'>
            <div className='contact__frm__msg'>
              <label className='contact__frm__msg--lbl'>Message</label>
              <textarea
                name='message'
                id='message'
                className='contact__frm__msg--txtar'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='contact__frm__msg--btn'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
