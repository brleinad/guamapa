import React, { createContext, useContext } from "react";
import axios from "axios";
// import axios from '../axiosConfig'
import { AuthContext } from "./auth-context";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authContext.authState.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const isTokenExpired = (errorResponse) => {
    return ( errorResponse.data.code === 'token_not_valid') 
  }

  const resetTokenAndReattempt = async (error) => {
    
  }

  authAxios.interceptors.response.use(
    response => {
      return response;
    }, error => {
      const code = error && error.response ? error.response.status : 0;
      console.log('error resp')
      console.log(error.response)
      if (isTokenExpired(error.response)) {
        resetTokenAndReattempt(error);

      }
      if (code === 401 || code === 403) {
          console.log(`error code: ${code}`);
      }
      return Promise.reject(error);
    }
  );

  return (
      <Provider value={{ authAxios }}>
          {children}
      </Provider>
  );
};

export { FetchContext, FetchProvider }