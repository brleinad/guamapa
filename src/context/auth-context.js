import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const expiresAt = localStorage.getItem("expiresAt");

  const [authState, setAuthState] = useState({
    accessToken,
    refreshToken,
    expiresAt,
    user: user ? JSON.parse(user) : {},
  });

  const setAuthInfo = ({ accessToken, userInfo, expiresAt }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiresAt', expiresAt);

    setAuthState({
      accessToken,
      refreshToken,
      expiresAt,
      user
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem('user');
    localStorage.removeItem('expiresAt');
    setAuthState({})
    history.push('/login');
  }

  const isAuthenticated = () => {
      if (!authState.accessToken || !authState.expiresAt) {
          return false
      }
      return (
          new Date().getTime() / 1000 < authState.expiresAt
      )

  }

  const isStaff = () => {
      return authState.user.is_staff;
  }

  return (
      <Provider
      value={{
          authState,
          setAuthState: authInfo => setAuthInfo(authInfo),
          logout,
          isAuthenticated,
          isStaff
      }}
      >
          {children}
      </Provider>
  )

};

export { AuthContext, AuthProvider }
