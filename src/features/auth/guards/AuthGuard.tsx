import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { ChildrenProps } from 'models';
import { PATH_AUTH } from 'configs';

const AuthGuard = ({ children }: ChildrenProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(`${PATH_AUTH.login}`);
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
