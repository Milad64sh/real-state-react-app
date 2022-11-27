import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';
import ContactUs from './pages/ContactUs';
import Category from './pages/Category';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import CreateList from './pages/CreateList';
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
            <Route path='/category/:categoryName' element={<Category />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/create-list' element={<CreateList />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
