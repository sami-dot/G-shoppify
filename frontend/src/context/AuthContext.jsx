/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../lib/api";
import Cookies from "js-cookie";
import FullSpinner from "../components/Spinner/FullSpinner";
const INITIAL_USER = {
  username: "",
  email: "",
  _id: "",
};
const AuthContext = createContext({
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => Boolean,
  logoutUser: () => {},
});

export default function AuthProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const { data, isPending: isLoading } = useCurrentUser();

  const checkAuthUser = async () => {
    try {
      const {
        data: {
          payload: { user: currentAccount },
        },
      } = await getCurrentUser();

      if (currentAccount) {
        setUser({
          _id: currentAccount._id,
          username: currentAccount.username,
          email: currentAccount.email,
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const logoutUser = () => {
    Cookies.remove("sh_token");
    setUser(INITIAL_USER);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    setUser,
    //
    isAuthenticated,
    setIsAuthenticated,
    //
    isLoading,
    //
    checkAuthUser,
    //
    logoutUser,
  };

  useEffect(() => {
    let isAuth = checkAuthUser();
    if (isAuth) {
      navigate({ pathname: location.pathname || "/" });
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <FullSpinner /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
