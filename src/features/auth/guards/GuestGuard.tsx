import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { PATH_HOME } from 'configs';
import { useAuth } from 'hooks';
import { ChildrenProps } from 'models';

const GuestGuard = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate(PATH_HOME.root, { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  return <>{children}</>;
};

export default GuestGuard;
