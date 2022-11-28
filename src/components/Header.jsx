import '../styles/css/index.css';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className='header'>
      <div className='header__text-box'>
        <h1 className='heading-primary'>
          <span className='heading-primary--sub'>find your</span>
          <span className='heading-primary--main'>home</span>
        </h1>
        <Link to={'/category/sale'} className='btn btn--hero'>
          Buy
        </Link>
        <Link to={'/category/rent'} className='btn btn--hero'>
          Rent
        </Link>
      </div>
    </header>
  );
}

export default Header;
