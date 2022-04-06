import React, { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from 'hooks';
import { confirmEmailAsync } from 'features/auth/authThunkAPI';
import { useAppDispatch } from 'stores';
import LoadingScreen from 'components/Loading/LoadingScreen';
import { EMAIL_CONFIRM_TOKEN, PATH_HOME } from 'configs';

const VerifyEmailPage = () => {
  const { isFetching } = useAuth();

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const token = searchParams.get(`${EMAIL_CONFIRM_TOKEN}`);

  useEffect(() => {
    if (token) {
      try {
        dispatch(confirmEmailAsync({ token: token })).then(({ meta: { requestStatus } }) => {
          if (requestStatus === 'fulfilled') {
            navigate(`${PATH_HOME.root}`, { replace: true });
          }
        });
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);
      }
    }
  }, [dispatch, navigate, token]);

  return <>{isFetching && <LoadingScreen />}</>;
};

export default VerifyEmailPage;
