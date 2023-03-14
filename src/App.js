import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
import EditPage from './components/page/editPage';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users/:userId?/" element={<Users />} />
          <Route path="/users/:userId/edit" element={<EditPage />} />
          <Route path="/login/:type?" element={<Login />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
