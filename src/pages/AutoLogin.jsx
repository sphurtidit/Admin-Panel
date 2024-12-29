import { verify } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function AutoLogin() {
  const { setAutoLogin, isAuthenticated } = useAuth();
  const loaction = useLocation();

  const { state } = JSON.parse(localStorage.getItem('userAuthinfo'));

  useEffect(() => {
    if (state.userAuthToken) {
      const fetchAdmin = async () => {
        try {
          const data = await verify({
            headers: {
              Authorization: `Bearer ${state.userAuthToken}`,
            },
          });

          setAutoLogin(data);
        } catch (err) {
          console.log('err');
        }
      };
      fetchAdmin();
    }
  }, []);

  return <Outlet />;
}

export default AutoLogin;
