import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { FcGoogle } from 'react-icons/fc';
import ThemeContext from '../context/ThemeContext';
function OAuth() {
  const { changeBtn, changeSignInBtn } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/profile');
      changeSignInBtn();
    } catch (error) {}
  };
  return (
    <div>
      <button className='signIn__form__OAuth--btn' onClick={onGoogleClick}>
        <FcGoogle />
      </button>
    </div>
  );
}

export default OAuth;
