import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import validator from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/selectField';
const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', profession: '' });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validateConfig = {
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: { message: 'Email is not correct' },
    },
    password: {
      isRequired: { message: 'Password is required' },
      isCapitalSymbol: {
        message: 'Password must contain at least one capital letter',
      },
      isContainDidgit: {
        message: 'Password must contain at least one didgit',
      },
      minLength: {
        message: 'Password cannot be shorter than 8 characters',
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Obligatory field',
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSummit = (e) => {
    e.preventDefault();
    const isvalid = validate();
    if (!isvalid) return;
    console.log(data);
  };

  const isValid = Object.keys(errors).length === 0;
  return (
    <form onSubmit={handleSummit}>
      <TextField
        label="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        onChange={handleChange}
        options={professions}
        defaultOption="Choose..."
        error={errors.profession}
        value={data.profession}
        label="Выберите профессию"
      />
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
