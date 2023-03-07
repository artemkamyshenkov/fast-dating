import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users/:userId?" element={<Users />} />
        <Route path="/login/:type?" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
