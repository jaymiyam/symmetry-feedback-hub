import { syncUser } from '../lib/api';
import { useUser, useAuth } from '@clerk/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useSyncUser = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
    isError,
  } = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess && !isError) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName || user.username || 'Guest',
        avatar: user.imageUrl,
      });
    }
  }, [isPending, isSignedIn, user, isSuccess, syncUserMutation, isError]);

  return { isSynced: isSuccess, isSyncError: isError };
};
