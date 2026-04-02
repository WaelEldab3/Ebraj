import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getMe,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if the user is simply not logged in
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: () => {
      // Invalidate and refetch user data after successful login
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => authService.register(userData),
  });
};

export const useVerifyAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code) => authService.verifyAccount(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useResendCode = () => {
  return useMutation({
    mutationFn: (email) => authService.resendCode(email),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ code, password }) => authService.resetPassword(code, password),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Immediately set user to null — UI reacts instantly without a refetch
      queryClient.setQueryData(['user'], null);
      // Remove all other cached queries to sanitize session state
      queryClient.removeQueries();
    },
  });
};

export const useRequestVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.requestVerification(),
    onSuccess: () => {
      // Invalidate user data to reflect PENDING_REVIEW state
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useSubAccounts = () => {
  return useQuery({
    queryKey: ['sub-accounts'],
    queryFn: authService.getSubAccounts,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSubAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => authService.createSubAccount(userData),
    onSuccess: () => {
      // Refresh the list of sub-accounts
      queryClient.invalidateQueries({ queryKey: ['sub-accounts'] });
    },
  });
};

export const useLawResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (action) => authService.lawResponse(action),
    onSuccess: () => {
      // Refresh user data to reflect agreedToLaw change
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
