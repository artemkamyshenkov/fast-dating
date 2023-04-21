import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import EditPage from './components/page/editPage';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './hooks/useAuth';
import LogOut from './layouts/logOut';
import { useDispatch, useSelector } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/professions';
import { getIsLoggedIn, loadUsersList } from './store/users';
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    dispatch(loadUsersList());
  }, [isLoggedIn]);
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users/:userId?/" element={<Users />} />
          <Route path="/users/:userId/edit" element={<EditPage />} />
          <Route path="/login/:type?" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
