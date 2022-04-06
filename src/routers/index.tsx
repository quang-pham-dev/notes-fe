import React, { lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { Loadable } from 'components/Loading/Loadable';
import MainLayout from 'layout/MainLayout';
import AdminLayout from 'layout/AdminLayout';
import GuestGuard from 'features/auth/guards/GuestGuard';
import AuthGuard from 'features/auth/guards/AuthGuard';
import RoleBaseGuard from 'features/auth/guards/RoleBaseGuard';

export default function RoutesMain() {
  return useRoutes([
    // Authentication
    {
      path: 'auth',
      element: <MainLayout />,
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        {
          path: 'verify',
          element: (
            <GuestGuard>
              <VerifyEmailPage />
            </GuestGuard>
          ),
        },
      ],
    },
    // Admin
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'upload',
        },
        {
          path: 'users',
          element: (
            <AuthGuard>
              <RoleBaseGuard accessibleRoles="ADMIN">
                <UploadPage />
              </RoleBaseGuard>
            </AuthGuard>
          ),
        },
      ],
    },
    // Publish
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: (
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          ),
        },
      ],
    },
    { path: '404', element: <Error404Page /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
// IMPORT COMPONENTS

// Authentication
const LoginPage = Loadable(lazy(() => import('pages/Login/index')));
const RegisterPage = Loadable(lazy(() => import('pages/Register/index')));
const VerifyEmailPage = Loadable(lazy(() => import('pages/Verify/index')));

// Features
const HomePage = Loadable(lazy(() => import('pages/Home/index')));
const Error404Page = Loadable(lazy(() => import('pages/404/404Page')));
// Admin feature
const UploadPage = Loadable(lazy(() => import('pages/Upload/index')));
