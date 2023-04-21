import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UsersLoader from '../components/HOC/usersLoader';
const Users = () => {
  const { userId } = useParams();
  return (
    <>
      <UsersLoader>
        {userId ? <UserPage userId={userId} /> : <UsersListPage />}{' '}
      </UsersLoader>
    </>
  );
};

export default Users;
