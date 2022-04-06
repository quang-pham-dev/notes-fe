import { useMemo } from 'react';

import { selectAuth } from 'features/auth/authSlice';
import { useAppSelector } from 'stores';

export const useAuth = () => {
  const auth = useAppSelector(selectAuth);

  return useMemo(() => ({ ...auth }), [auth]);
};
