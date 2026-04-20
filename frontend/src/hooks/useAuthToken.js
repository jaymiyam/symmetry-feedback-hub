import { useAuth } from '@clerk/react';
import { useEffect } from 'react';
import api from '../lib/axios';

let isInterceptorRegistered = false;

export const useAuthToken = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  useEffect(() => {
    if (isInterceptorRegistered) return;

    const interceptor = api.interceptors.request.use(
      async (config) => {
        if (isSignedIn) {
          const token = await getToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    isInterceptorRegistered = true;

    return () => {
      api.interceptors.request.eject(interceptor);
      isInterceptorRegistered = false;
    };
  }, [isSignedIn, getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
};
