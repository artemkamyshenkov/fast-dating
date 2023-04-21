import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validator from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualities,
  getQualitiesLoadingStatus,
} from '../../../store/qualities';
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../../store/professions';
import { getCurrentUserData, updateUser } from '../../../store/users';

const EditUserPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { updateUserData } = useAuth();
  const currentUser = useSelector(getCurrentUserData());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());
  const [errors, setErrors] = useState({});

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id,
  }));
  function getQualitiesListById(qualitiesId) {
    const qualitiesArr = [];
    for (let qualId of qualitiesId) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArr.push(quality);
          break;
        }
      }
    }
    return qualitiesArr;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      updateUser({
        ...data,
        qualities: data.qualities.map((qual) => qual.value),
      })
    );
    // updateUserData({
    //   ...data,
    //   qualities: data.qualities.map((qual) => qual.value),
    // });
    navigate(`/users/${currentUser._id}`);
  };
  const transformData = (data) => {
    return getQualitiesListById(data).map((qual) => ({
      label: qual.name,
      value: qual._id,
    }));
  };
  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
      },
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя',
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="container mt-5 position-relative">
      <Link
        className="btn btn-primary position-absolute top-0"
        to={`/users/${currentUser._id}`}
      >
        Назад
      </Link>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
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
                defaultValue={data.qualities}
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
