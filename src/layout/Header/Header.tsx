import React, { useState, useCallback, useContext } from 'react';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import LoginContext from '@utils/contexts/loginContext';
// import {signIn, signOut, useSession} from 'next-auth/react/index'

interface P {
  showLoginWindow: boolean;
  setShowLoginWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ showLoginWindow, setShowLoginWindow }: P) => {
  const { user, setUser } = useContext(LoginContext);

  const [showRegisterWindow, setShowRegisterWindow] = useState<boolean>(false);

  const loginHandler = useCallback(() => {
    if (showRegisterWindow) {
      setShowRegisterWindow(false);
    }
    setShowLoginWindow(true);
  }, [showRegisterWindow]);

  const logoutHandler = () => {
    setUser({
      firstName: '',
      isLoggedin: false,
    });
    localStorage.removeItem('layershift_fa_refresh_token');
    sessionStorage.removeItem('layershift_fa_access_token');
    localStorage.removeItem('layershift_user_first_name');
    localStorage.removeItem('layershift_user_info');
    localStorage.removeItem('layershift_user_is_logged_in');
  };

  const registerHandler = useCallback(() => {
    if (showLoginWindow) {
      setShowLoginWindow(false);
    }
    setShowRegisterWindow(true);
  }, [showLoginWindow]);
  return (
    <>
      <section className=" h-20 w-full bg-purple">
        <div className="container mx-auto flex h-full items-center justify-end gap-x-6">
          {user.isLoggedin && (
            <div className="text-white">Hello {user.firstName} !</div>
          )}
          {/* {!user.isLoggedin && (
            <button
              className=" border-2 border-white bg-white px-4 py-2 text-purple duration-300 hover:bg-liliac"
              onClick={registerHandler}
            >
              Register
            </button>
          )} */}
          {!user.isLoggedin ? (
            <div></div>
          ) : (
            <button
              className=" border-2 border-white bg-white px-4 py-2 text-purple duration-300 hover:bg-liliac"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </section>
      {/* {showRegisterWindow && (
        <Register closePopUp={() => setShowRegisterWindow(false)} />
      )}
      {showLoginWindow && (
        <Login
          closePopUp={() => setShowLoginWindow(false)}
          openRegister={() => setShowRegisterWindow(true)}
        />
      )} */}
    </>
  );
};

export default Header;
