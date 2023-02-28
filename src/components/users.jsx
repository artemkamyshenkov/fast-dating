import React, { useState } from "react";
import api from "../api/index";
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    if (number === 0) return "Никто не будет с тобой тусить, шляпа:(";
    else if (number === 1) return "1 человек тусанет с тобой сегодня";
    else if (number > 1 && number <= 4)
      return `${number} человека тусанет с тобой сегодня`;
    else {
      return `${number} человек тусанут с тобой сегодня`;
    }
  };
  return (
    <>
      <h1
        className={
          "badge p-2 " + (users.length > 0 ? "bg-primary" : "bg-danger")
        }
      >
        {renderPhrase(users.length)}
      </h1>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={"badge m-2 bg-" + quality.color}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
