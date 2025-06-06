import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useRequireAuth(redirectUrl: string = '/login') {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate(redirectUrl);
    }
  }, [currentUser, loading, navigate, redirectUrl]);

  return { currentUser, loading };
}