import { Link } from 'react-router-dom';
// COMPONENTS
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Explore from '../components/Explore';
// ICONS

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Explore />
    </>
  );
}

export default Home;
