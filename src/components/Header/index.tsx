import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { PATH_AUTH, PATH_HOME } from 'configs';
import { useAppDispatch, useAppSelector } from 'stores';
import { logoutAsync } from 'features/auth/authThunkAPI';
import { clearState } from 'features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutAsync()).then(({ meta: { requestStatus } }) => {
      if (requestStatus === 'fulfilled') {
        dispatch(clearState());
      }
    });
    navigate(`${PATH_HOME.root}`, { replace: true });
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">NOTE TRACKER</Link>
      </div>
      <ul>
        {currentUser ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={PATH_AUTH.login}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={PATH_AUTH.register}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
