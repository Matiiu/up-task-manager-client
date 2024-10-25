import useAuth from '@/hooks/useAuth';
import ProfileForm from '@/components/profiles/ProfileForm';

export default function ProfileView() {
	const { data, isLoading } = useAuth();

	if (isLoading) return <div>Cargando...</div>;

	if (data) return <ProfileForm user={data} />;
}
