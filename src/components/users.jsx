import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import User from './user';
import paginate from '../utils/paginate';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import api from '../api/index';
const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const userCrop = paginate(users, currentPage, pageSize);
  return (
    <>
      {professions && <GroupList items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf} />}

      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Избранное</th>
              <th scope="col">Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};
Users.propTypes = {
  users: PropTypes.array,
};
export default Users;
