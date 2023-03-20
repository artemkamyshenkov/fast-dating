import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import localStorageService, {
  setTokens,
} from '../services/localStorage.service';
import randomInt from '../utils/randomInt';

const AuthContext = React.createContext();

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);

      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 300),
        ...rest,
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с такой почтой уже зарегистрирован',
          };
          throw errorObject;
        }
      }
    }
  }

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Неверный логин или пароль');

          default:
            throw new Error('Слишком много попыток входа, попробуйте позже');
        }
      }
    }
  }
  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    }
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
