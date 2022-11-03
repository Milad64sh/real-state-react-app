import { useState } from 'react';
import '../styles/css/index.css';
import Button from './Button';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

import { Link } from 'react-router-dom';
function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuToggler = () => setOpenMenu((p) => !p);
  return (
    <div className='navigation'>
      <div className='navigation__content'>
        <div>
          <span className='logo'></span>
        </div>

        <div>
          <nav className={`nav ${openMenu ? `nav--open` : {}}`}>
            <Link className='nav__item' to={'/buy'}>
              Buy
            </Link>
            <Link className='nav__item' to={'/rent'}>
              Rent
            </Link>
            <Link className='nav__item' to={'/about-us'}>
              About Us
            </Link>
            <Link className='nav__item' to={'/contact us'}>
              Contact Us
            </Link>
            <div className='nav__button__container'>
              <Button />
            </div>
          </nav>
        </div>
        <div>
          <div className='navigation__button__container'>
            <Button />
          </div>
          <button className='navigation__toggler' onClick={menuToggler}>
            {!openMenu ? <AiOutlineMenu /> : <AiOutlineClose />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
