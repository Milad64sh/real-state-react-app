import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBed } from 'react-icons/fa';
import { FaBath } from 'react-icons/fa';

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className='category__listing'>
      <Link to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className='category__listing--img'
        />
      </Link>
      <div className='category__listing--details'>
        <h3 className='category__listing--details--h3'>{listing.name}</h3>
        <p className='category__listing--details--desc'>
          {listing.description}
        </p>
        <p className='category__listing--details--price'>
          $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          {listing.type === 'rent' && ' / Month'}
        </p>
        <div className='category__listing--details--info'>
          <div className='category__listing--details--info--bed'>
            <FaBed />
            <p className='category__listing--details--info--bed--text'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
          </div>
          <div className='category__listing--details--info--bath'>
            <FaBath />
            <p className='category__listing--details--info--bath--text'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </div>
      {onDelete && (
        <AiOutlineClose onClick={() => onDelete(listing.id, listing.name)} />
      )}
    </li>
  );
}

export default ListingItem;
