import { createContext, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [changeBtn, setChangeBtn] = useState(false);
  const [changeDetails, setChangeDetails] = useState(false);
  const [profileDetailEdit, setProfileDetailEdit] = useState({
    item: {},
    edit: false,
  });
  const changeSignInBtn = () => {
    setChangeBtn((prevState) => !prevState);
  };
  // EDIT PROFILE DETAILS
  const editDetail = () => {
    setChangeDetails((prevState) => !prevState);
  };
  const editProfile = (item) => {
    editDetail();
    setProfileDetailEdit({
      item,
      edite: true,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        changeBtn,
        changeDetails,
        changeSignInBtn,
        editProfile,
        editDetail,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
