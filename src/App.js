import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Contact from './pages/Contact';
import Category from './pages/Category';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import CreateList from './pages/CreateList';
import EditList from './pages/EditList';
import Listing from './pages/Listing';
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
            <Route path='/contact/:landlordId' element={<Contact />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/create-list' element={<CreateList />} />
            <Route path='/edit-list/:listingId' element={<EditList />} />
            <Route
              path='//category/:categoryName/:listingId'
              element={<Listing />}
            />
          </Routes>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
