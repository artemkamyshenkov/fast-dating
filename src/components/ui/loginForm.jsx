import React, { useEffect, useState } from 'react';
import validator from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setEnterError(null);
  };

  const { logIn } = useAuth();
  const navigate = useNavigate();
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

  const handleSummit = async (e) => {
    e.preventDefault();
    const isvalid = validate();
    if (!isvalid) return;

    try {
      await logIn(data);
      navigate('/');
    } catch (error) {
      setEnterError(error.message);
    }
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
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        disabled={!isValid || enterError}
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
