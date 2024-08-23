import { Outlet } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ToastContainer } from 'react-toastify';

function AuthLayout() {
	return (
		<>
			<div className='bg-gray-700 min-h-screen'>
				<div className='py-10 lg:py-20 mx-auto w-[450px]'>
					<Logo />
					<div className='mt-10'>
						<Outlet />
					</div>
				</div>
			</div>
			<ToastContainer pauseOnFocusLoss={false} />
		</>
	);
}

export default AuthLayout;
