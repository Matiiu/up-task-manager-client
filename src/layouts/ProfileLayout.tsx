import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Tabs from '@/components/profiles/Tabs';

export default function ProfileLayout() {
	return (
		<>
			<Tabs />
			<Outlet />
			<ToastContainer pauseOnFocusLoss={false} />
		</>
	);
}
