import React, { useState, useEffect } from 'react';
import api from '../../api';
import SelectField from './form/selectField';
import TextAreaField from './form/textAreaField';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';

const initialState = { user: '', content: '' };
const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialState);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validateConfig = {
    userId: {
      isRequired: { message: 'От кого будет комментарий?' },
    },
    content: {
      isRequired: { message: 'Поле не может быть пустым' },
    },
  };

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    api.users.fetchAll().then(setUsers);
  }, []);

  const clearForm = () => {
    setData(initialState);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const arrayOfusers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id,
    }));

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          options={arrayOfusers}
          name="userId"
          value={data.userId}
          defaultOption="Выберите пользователя"
          error={errors.userId}
        />
        <TextAreaField
          onChange={handleChange}
          options={arrayOfusers}
          name="content"
          label="Сообщение"
          value={data.content}
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Отправить</button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};
export default AddCommentForm;
