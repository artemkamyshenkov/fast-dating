import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import validator from '../../utils/validator';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useQualities } from '../../hooks/useQualities';
import { useProfessions } from '../../hooks/useProfession';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false,
  });
  const [errors, setErrors] = useState({});
  const { professions } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const { qualities } = useQualities();
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id,
  }));
  const { signUp } = useAuth();
  const handleChange = (target) => {
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
    licence: {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isvalid = validate();
    if (!isvalid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((qual) => qual.value),
    };
    try {
      await signUp(newData);
      navigate('/');
    } catch (error) {
      setErrors(error);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
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
        options={professionsList}
        defaultOption="Choose..."
        error={errors.profession}
        value={data.profession}
        name="profession"
        label="Выберите профессию"
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Выберите качества"
        defaultValue={data.qualities}
      />

      <button
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto mb-2"
      >
        Submit
      </button>
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Согласен с правилами использования{' '}
      </CheckBoxField>
    </form>
  );
};

export default RegisterForm;
