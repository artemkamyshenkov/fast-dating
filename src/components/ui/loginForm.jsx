import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, login } from '../../store/users';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthErrors());
  const validateConfig = {
    email: {
      isRequired: { message: 'Email is required' },
    },
    password: {
      isRequired: { message: 'Password is required' },
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
    dispatch(login({ payload: data }));
    navigate('/users');
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
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto mb-2"
      >
        Submit
      </button>
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
    </form>
  );
};

export default LoginForm;
