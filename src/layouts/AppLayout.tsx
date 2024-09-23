import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderView from '@/views/HeaderView';
import FooterView from '@/views/FooterView';
import useAuth from '@/hooks/useAuth';

function AppLayout() {
	const { data, isError, isLoading } = useAuth();

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <Navigate to={'/auth/login'} />;

	if (data) {
		return (
			<>
				<HeaderView user={data} />
				<div className='max-w-screen-2xl mx-auto mt-10 p-5'>
					<Outlet />
				</div>
				<FooterView />
				<ToastContainer pauseOnFocusLoss={false} />
			</>
		);
	}
}

export default AppLayout;
