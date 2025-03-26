// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();

  console.log('acctType:', login.profile_status?.profile_status
    ?.AcctType);
  console.log('status:', login.profile_status?.status);

  useEffect(() => {
    // If no acctType is logged in, redirect to login.
    if (login.profile_status?.status !== "Sign in successful") {
      return navigate('/login');
    }
  }, [])

  // If a role is required but the acctType doesn't match, redirect to the home page.
  if (requiredRole && login.profile_status?.profile_status
    ?.AcctType !== requiredRole) {
    return navigate('/login');
  } else {
    return (
        <Outlet />
    );
  }
};

export default ProtectedRoute;
