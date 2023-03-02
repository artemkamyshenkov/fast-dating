import React, { useState } from 'react';
import api from './api';
import Users from './components/users';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

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
  return (
    <div>
      <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
    </div>
  );
}

export default App;
