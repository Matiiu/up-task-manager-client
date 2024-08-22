import AuthLayout from '@/layouts/AuthLayout';
import LoginView from '@/views/auth/LoginView';
import RegisterView from '@/views/auth/RegisterView';
import { Route, Routes } from 'react-router-dom';

function LoginRoutes() {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route
					path='/login'
					element={<LoginView />}
				/>
			</Route>
			<Route element={<AuthLayout />}>
				<Route
					path='/register'
					element={<RegisterView />}
				/>
			</Route>
		</Routes>
	);
}

export default LoginRoutes;
