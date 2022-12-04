import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { FaBath } from 'react-icons/fa';

function ListingItem({ listing, id, onDelete }) {
  return (
    <>
      <div className='category__cnt'>
        <li className='category__cnt__listing'>
          <Link to={`/category/${listing.type}/${id}`}>
            <img
              src={listing.imgUrls[0]}
              alt={listing.name}
              className='category__cnt__listing--img'
            />
          </Link>
          <div className='category__cnt__listing--details'>
            <h3 className='category__cnt__listing--details--h3'>
              {listing.name}
            </h3>
            <p className='category__cnt__listing--details--desc'>
              {listing.description}
            </p>
            <p className='categor__cnty__listing--details--price'>
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
            <div className='category__cnt__listing--details--info'>
              <div className='category__cnt__listing--details--info--bed'>
                <FaBed />
                <p className='category__cnt__listing--details--info--bed--text'>
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : '1 Bedroom'}
                </p>
              </div>
              <div className='category__cnt__listing--details--info--bath'>
                <FaBath />
                <p className='category__cnt__listing--details--info--bath--text'>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : '1 Bathroom'}
                </p>
              </div>
              <div className='category__cnt__listing--details--info--trash'>
                {onDelete && (
                  <FaTrashAlt
                    onClick={() => onDelete(listing.id, listing.name)}
                  />
                )}
              </div>
            </div>
          </div>
        </li>
      </div>
    </>
  );
}

export default ListingItem;
