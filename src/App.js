import React, { useEffect, useState } from 'react';
import api from './api';
import Users from './components/users';

function App() {
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  return <div>{users && <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />}</div>;
}

export default App;
