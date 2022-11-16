import { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [changeBtn, setChangeBtn] = useState(false);

  const changeSignInBtn = () => {
    setChangeBtn((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider
      value={{
        changeBtn,
        changeSignInBtn,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
