import { Link } from 'react-router-dom';
// COMPONENTS
import Header from '../components/Header';
import Navbar from '../components/Navbar';
// ICONS
import { IoIosArrowDown } from 'react-icons/io';
function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <div className='home'>
          <div class='u-center-text u-margin-bottom-big'>
            <h2 class='home__heading-primary'>
              Discover great investment opportunities
            </h2>
            <h3 className='home__heading-primary--sub'>
              Expand your choices with us
            </h3>
            <p className='home__paragraph'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              tempora animi quaerat nostrum quisquam amet quidem repellendus
              dignissimos eaque provident! Quae voluptas consequuntur,
              recusandae perspiciatis reiciendis porro, rerum eligendi dolores
              vitae, ducimus praesentium voluptate deserunt ipsam officia.
              Facere, reiciendis. Aperiam suscipit quas delectus praesentium!
            </p>
            <p className='home__paragraph'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              tempora animi quaerat nostrum quisquam amet quidem repellendus
              dignissimos eaque provident! Quae voluptas consequuntur,
              recusandae perspiciatis reiciendis porro, rerum eligendi dolores
              vitae, ducimus praesentium voluptate deserunt ipsam officia.
              Facere, reiciendis. Aperiam suscipit quas delectus praesentium hic
              aliquam quaerat culpa perspiciatis ipsa!
            </p>
          </div>
          <a href='#explore' className='home__href bouncingBtn'>
            more <IoIosArrowDown />
          </a>
        </div>
        <div className='row'>
          <div className='row__unit'>
            <div className='row__unit--explore' id='explore'>
              <div className='row__unit--explore--link'>
                <Link className='row__unit--explore--link--text' to={'/rent'}>
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className='row__unit'>
            <div className='row__unit--rent'>
              <div className='row__unit--rent--link'>
                <Link className='row__unit--rent--link--text' to={'/rent'}>
                  Rent
                </Link>
              </div>
            </div>
          </div>
          <div className='row__unit'>
            <div className='row__unit--buy'>
              <div className='row__unit--buy--link'>
                <Link className='row__unit--buy--link--text' to={'/buy'}>
                  Buy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
