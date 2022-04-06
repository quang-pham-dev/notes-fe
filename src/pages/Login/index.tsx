import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaSignInAlt, FaEyeSlash, FaEye } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useAuth } from 'hooks';
import { PATH_HOME } from 'configs';
import { clearState } from 'features/auth/authSlice';
import { loginAsync } from 'features/auth/authThunkAPI';
import { UserLogin } from 'models';
import { useAppDispatch } from 'stores';

function Login() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { emailAddress, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, currentUser, isError } = useAuth();

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }

    if (isAuthenticated || currentUser) {
      navigate(`${PATH_HOME.root}`, { replace: true });
    }
  }, [currentUser, isAuthenticated, navigate, dispatch, isError]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserLogin = {
      emailAddress,
      password,
    };
    if (emailAddress !== '' && password !== '') {
      dispatch(loginAsync(userData));
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> LOGIN
        </h1>
        <p>Welcome to Note Tracker</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-email">
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
              <div className="input-email-icon">
                <MdEmail />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="input-password">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                required
              />
              <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
