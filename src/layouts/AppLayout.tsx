import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderView from '@/views/HeaderView';
import FooterView from '@/views/FooterView';

function AppLayout() {
	return (
		<>
			<HeaderView />
			<section className='max-w-screen-2xl mx-auto mt-10 p-5'>
				<Outlet />
			</section>
			<FooterView />
			<ToastContainer
				pauseOnHover={false}
				pauseOnFocusLoss={false}
			/>
		</>
	);
}

export default AppLayout;
