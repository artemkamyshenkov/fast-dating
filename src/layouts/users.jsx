import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import { useAuth } from '../hooks/useAuth';
import UserProvider from '../hooks/useUsers';
const Users = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  return (
    <>
      <UserProvider>
        {userId ? <UserPage userId={userId} /> : <UsersListPage />}{' '}
      </UserProvider>
    </>
  );
};

export default Users;
