import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import { useAppDispatch } from 'stores';
import { PATH_HOME } from 'configs';
import { registerAsync } from 'features/auth/authThunkAPI';
import { UserRegister } from 'models';
import { clearState } from 'features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const { firstName, lastName, emailAddress, password, confirmPassword, phoneNumber } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isSuccess, currentUser } = useAuth();

  useEffect(() => {
    if (isSuccess || currentUser) {
      navigate(`${PATH_HOME.root}`, { replace: true });
    }

    return () => {
      dispatch(clearState());
    };
  }, [isSuccess, currentUser, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData: UserRegister = {
        emailAddress,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber,
      };

      dispatch(registerAsync(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-name">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="Enter your first name"
                onChange={onChange}
                required
              />
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Enter your last name"
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              value={emailAddress}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone number"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block btn-register">
              Sign up
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
