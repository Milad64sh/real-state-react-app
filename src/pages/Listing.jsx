import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { BsFillShareFill } from 'react-icons/bs';
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import SwiperCore, { Navigation } from 'swiper';

// COMPONENT
import Spinner from '../components/Spinner';

SwiperCore.use([Navigation, EffectFade]);
function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className='list'>
        <div className='list__slide'>
          <Swiper
            modules={[Navigation, EffectFade]}
            navigation={true}
            effect
            speed={800}
            slidesPerView={1}
            loop
          >
            {listing.imgUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img src={`${listing.imgUrls[index]}`} alt='houses' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='list__details'>
          <div className='list__details--hdng'>
            <h3 className='list__details--hdng heading-tertiary'>
              {listing.name} - $
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </h3>
            <div
              className='list__details--hdng--share'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareLinkCopied(true);
                setTimeout(() => {
                  setShareLinkCopied(false);
                }, 2000);
              }}
            >
              <BsFillShareFill />
            </div>
            {shareLinkCopied && (
              <p className='list__share--copied'>Link Copied!</p>
            )}
          </div>
          <p className='list__details--lcn'>{listing.location}</p>
          <p className='list__details--tp'>
            For {listing.type === 'rent' ? 'Rent' : 'Sale'}
          </p>
          {listing.offer && (
            <p className='list__details--dsPrc'>
              ${listing.regularPrice - listing.discountedPrice} discount
            </p>
          )}
          <ul className='list__details--list'>
            <li>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </li>
            <li>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </li>
            <li>{listing.parking && 'Parking Spot'}</li>
            <li>{listing.furnished && 'Furnished'}</li>
          </ul>
          {/* <p className='list__details--tlt'>Location</p> */}
          {auth.currentUser?.uid !== listing.userRef && (
            <Link
              to={`/contact/${listing.userRef}?listingName=${listing.name}`}
              className='list__details--btn'
            >
              Contact Landlord
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Listing;
