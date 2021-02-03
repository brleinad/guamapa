import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const user = localStorage.getItem("user");
  console.log('from local')
  console.log({refreshToken, accessToken, user})

  const [authState, setAuthState] = useState({
    accessToken,
    refreshToken,
    user: user ? JSON.parse(user) : {},
  });

  const setAuthInfo = ({ accessToken, user, refreshToken }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthState({
      accessToken,
      refreshToken,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAuthState({});
    // history.push("/login");
    history.push("/");
  };

  const isAuthenticated = () => {
    // TODO: check expiration in token
    console.log(' is it auth?')
    if (!authState.accessToken) {
      return false;
    }
    console.log('yup');
    return (
      // TODO actually check
      true
      // new Date().getTime() / 1000 < authState.expiresAt
    );
  };

  const isStaff = () => {
    console.log('Use is ', authState.user.is_staff)
    return authState.user.is_staff;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isStaff,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
