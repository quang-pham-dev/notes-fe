import React from 'react';

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = 'ADMIN';
  return role;
};

type RoleBaseProps = {
  accessibleRoles: string;
  children: React.ReactElement;
};

const RoleBaseGuard = (props: RoleBaseProps) => {
  const { accessibleRoles, children } = props;
  const currentRole = useCurrentRole();
  if (!accessibleRoles.includes(currentRole)) {
    return (
      <div className="error">
        <h2>Permission Denied</h2>
        <p>You do not have permission to access this page</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleBaseGuard;
