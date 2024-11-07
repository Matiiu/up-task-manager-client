import { useQuery } from '@tanstack/react-query';
import AuthAPI from '@/api/Auth';

export default function useAuth() {
	const { data, isError, isLoading, error } = useQuery({
		queryKey: ['user'],
		queryFn: AuthAPI.getAuthenticatedUser,
		retry: 1,
		refetchOnWindowFocus: false,
	});

	return { data, isError, isLoading, error };
}
