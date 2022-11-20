import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import ContactUs from './pages/ContactUs';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
            <Route path='/buy' element={<Buy />} />
            <Route path='/rent' element={<Rent />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
