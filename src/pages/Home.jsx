import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
function Home() {
  const navigate = useNavigate();
  const onChange = () => {};
  return (
    <div className='home'>
      <Navbar />
      <Header />
    </div>
  );
}

export default Home;
